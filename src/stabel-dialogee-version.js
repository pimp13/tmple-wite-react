// نسخه ی نهایی هست این
module.exports = [
  {
    "checkout": function (context, helpers) {
      if (!helpers.dialogeeJoinEnsureUtils) {
        helpers.dialogeeJoinEnsureUtils = function () {
          if (helpers._dialogeeJoinUtilsReady) return;
          helpers._dialogeeJoinUtilsReady = true;

          // آدرس ثابت وب‌سرویس دیالوگی (طبق مستندات: https://online.dialogee.ir/api/{apiToken})
          helpers.dialogeeJoinApiUrl = function () {
            return 'https://online.dialogee.ir/api/6774f0fd7acc3fa7f3883ab5/aed55f03-073b-4ed9-9a95-d9989c4e6bdb';
          };

          // ساخت درخواست طبق فرمت مستندات: { method, params }
          helpers.dialogeeJoinCall = function (method, params, queryParams) {
            let url = helpers.dialogeeJoinApiUrl();
            if (queryParams && Object.keys(queryParams).length) {
              const qs = Object.entries(queryParams)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                .join('&');
              url += `?${qs}`;
            }
            return {
              handler: 'SendHttpRequest',
              params: {
                url,
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ method: method, params: params }),
              },
              next: function (r) {
                try {
                  return typeof r === 'string' ? JSON.parse(r) : (r || {});
                } catch (_) {
                  return { success: false, error: 'پاسخ نامعتبر دیالوگی' };
                }
              },
            };
          };

          helpers.dialogeeJoinUsername = function (userId) {
            return String(userId || 'user').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 48);
          };

          helpers.dialogeeJoinPassword = function (userId) {
            return `Academy${String(userId || 'user').replace(/[^a-zA-Z0-9]/g, '')}!`;
          };

          helpers.dialogeeJoinDisplayName = function (user) {
            const fname = String(user?.firstName || user?.fname || '').trim();
            const lname = String(user?.lastName || user?.lname || '').trim();
            const full = `${fname} ${lname}`.trim();
            return full || String(user?.username || user?.id || 'کاربر');
          };

          // نگاشت نقش کاربر به شناسه نقش دیالوگی طبق جدول مستندات:
          // 4=مدیر, 3=استاد, 2=ارائه‌دهنده, 1=دانش‌پذیر (پیش‌فرض)
          helpers.dialogeeJoinMapRole = function (roleType) {
            const role = String(roleType || '').toLowerCase();
            switch (role) {
              case 'admin':
              case 'owner':
              case 'manager':
                return 4;
              case 'teacher':
                return 3;
              case 'assistant':
              case 'presenter':
                return 2;
              default:
                return 1;
            }
          };

          helpers.dialogeeJoinResolveUserRoleType = function (user) {
            return String(
              user?.role_type || user?.roleType || user?.role || ''
            ).trim().toLowerCase();
          };

          // slug یکتا و deterministic بر اساس یک کلید گروهی (room_key)
          helpers.dialogeeJoinSlugFromKey = function (roomKey) {
            return `grp-${String(roomKey || '').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 60)}`;
          };

          helpers.dialogeeJoinFindRoom = function (roomsResult, slug, name) {
            const docs = Array.isArray(roomsResult?.rooms?.docs) ? roomsResult.rooms.docs : [];
            const normalizedName = String(name || '').trim();
            return docs.find((room) => (
              String(room?.slug || '') === slug
              || (normalizedName && String(room?.name || '').trim() === normalizedName)
            )) || null;
          };

          helpers.dialogeeJoinHasMorePages = function (roomsResult, currentPage) {
            const totalPages = Number(roomsResult?.rooms?.totalPages) || 1;
            return currentPage < totalPages;
          };
        };
      }

      helpers.dialogeeJoinEnsureUtils();

      // 1) کاربر باید در سامانه لاگین باشد
      if (!helpers.IsLogin(context.user)) {
        return { success: false, error: 'برای ورود ابتدا وارد سامانه شوید' };
      }

      context.userId = String(context.user.id || '').trim();
      if (!context.userId) {
        return { success: false, error: 'شناسه کاربر معتبر نیست' };
      }

      // 2) شناسه‌ی گروه/کلاس مشترک
      context.roomKey = String(context.query?.room_key || context.query?.group_id || '').trim();
      if (!context.roomKey) {
        return { success: false, error: 'شناسه گروه (room_key) ارسال نشده است' };
      }
      context.roomSlug = helpers.dialogeeJoinSlugFromKey(context.roomKey);

      // 3) نام room
      context.roomName = String(context.query?.room_name || context.roomKey).trim();

      // 4) اطلاعات حساب دیالوگی متناظر با این کاربر
      context.dialogeeUsername = helpers.dialogeeJoinUsername(context.userId);
      context.dialogeePassword = helpers.dialogeeJoinPassword(context.userId);
      context.dialogeeName = helpers.dialogeeJoinDisplayName(context.user);

      // 5) نقش کاربر
      context.accessRole = helpers.dialogeeJoinResolveUserRoleType(context.user);
      context.dialogeeRole = helpers.dialogeeJoinMapRole(context.accessRole);

      return true;
    },

    // ---- جستجوی room موجود، تا 3 صفحه ----
    "asynch1": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      return helpers.dialogeeJoinCall('getRooms', { page: 1, per_page: 1000 }, { page: 1, per_page: 1000 });
    },
    "validation1": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      const result = context.action?.asynch1 || {};
      if (result.success === false) {
        return { success: false, error: result.error || 'دریافت لیست اتاق‌ها ناموفق بود' };
      }
      const found = helpers.dialogeeJoinFindRoom(result, context.roomSlug, context.roomName);
      if (found?.id) {
        context.roomId = found.id;
        context.roomWasCreated = false;
      } else if (helpers.dialogeeJoinHasMorePages(result, 1)) {
        context.needsSearchPage2 = true;
      } else {
        context.needsCreateRoom = true;
      }
      return true;
    },
    "asynch2": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsSearchPage2) return '';
      return helpers.dialogeeJoinCall('getRooms', { page: 2, per_page: 1000 }, { page: 2, per_page: 1000 });
    },
    "validation2": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsSearchPage2) return true;
      const result = context.action?.asynch2 || {};
      const found = helpers.dialogeeJoinFindRoom(result, context.roomSlug, context.roomName);
      if (found?.id) {
        context.roomId = found.id;
        context.roomWasCreated = false;
      } else if (helpers.dialogeeJoinHasMorePages(result, 2)) {
        context.needsSearchPage3 = true;
      } else {
        context.needsCreateRoom = true;
      }
      return true;
    },
    "asynch3": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsSearchPage3) return '';
      return helpers.dialogeeJoinCall('getRooms', { page: 3, per_page: 1000 }, { page: 3, per_page: 1000 });
    },
    "validation3": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsSearchPage3) return true;
      const result = context.action?.asynch3 || {};
      const found = helpers.dialogeeJoinFindRoom(result, context.roomSlug, context.roomName);
      if (found?.id) {
        context.roomId = found.id;
        context.roomWasCreated = false;
      } else {
        context.needsCreateRoom = true;
      }
      return true;
    },

    // ---- ساخت room در صورت پیدا نشدن ----
    "asynch4": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsCreateRoom) return '';
      return helpers.dialogeeJoinCall('createRoom', {
        name: context.roomName,
        duration: 0,
        max_user: 1000,
        has_guest: true,
        slug: context.roomSlug,
      });
    },
    "validation4": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsCreateRoom) return true;
      const result = context.action?.asynch4 || {};
      if (result.success && result.room?.id) {
        context.roomId = result.room.id;
        context.roomWasCreated = true;
        return true;
      }
      // اگر ساخت با تداخل slug شکست خورد (یعنی room جایی هست که تا 3 صفحه پیدا نکردیم)
      // یک جستجوی کامل دیگر (تا 3 صفحه) انجام می‌دهیم.
      context.needsRecheckRoom = true;
      return true;
    },

    // ---- جستجوی مجدد بعد از شکست ساخت، تا 3 صفحه ----
    "asynch5": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsRecheckRoom) return '';
      return helpers.dialogeeJoinCall('getRooms', { page: 1, per_page: 1000 }, { page: 1, per_page: 1000 });
    },
    "validation5": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsRecheckRoom) return true;
      const result = context.action?.asynch5 || {};
      const found = helpers.dialogeeJoinFindRoom(result, context.roomSlug, context.roomName);
      if (found?.id) {
        context.roomId = found.id;
      } else if (helpers.dialogeeJoinHasMorePages(result, 1)) {
        context.needsRecheckPage2 = true;
      } else {
        const createErr = context.action?.asynch4 || {};
        return { success: false, error: createErr.error || 'ساخت / یافتن اتاق مشترک ناموفق بود' };
      }
      return true;
    },
    "asynch6": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsRecheckPage2) return '';
      return helpers.dialogeeJoinCall('getRooms', { page: 2, per_page: 1000 }, { page: 2, per_page: 1000 });
    },
    "validation6": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsRecheckPage2) return true;
      const result = context.action?.asynch6 || {};
      const found = helpers.dialogeeJoinFindRoom(result, context.roomSlug, context.roomName);
      if (found?.id) {
        context.roomId = found.id;
      } else if (helpers.dialogeeJoinHasMorePages(result, 2)) {
        context.needsRecheckPage3 = true;
      } else {
        const createErr = context.action?.asynch4 || {};
        return { success: false, error: createErr.error || 'ساخت / یافتن اتاق مشترک ناموفق بود' };
      }
      return true;
    },
    "asynch7": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsRecheckPage3) return '';
      return helpers.dialogeeJoinCall('getRooms', { page: 3, per_page: 1000 }, { page: 3, per_page: 1000 });
    },
    "validation7": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsRecheckPage3) return true;
      const result = context.action?.asynch7 || {};
      const found = helpers.dialogeeJoinFindRoom(result, context.roomSlug, context.roomName);
      if (!found?.id) {
        const createErr = context.action?.asynch4 || {};
        return { success: false, error: createErr.error || 'ساخت / یافتن اتاق مشترک ناموفق بود' };
      }
      context.roomId = found.id;
      return true;
    },

    // ---- حساب دیالوگی کاربر ----
    "asynch8": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      return helpers.dialogeeJoinCall('getUser', {
        username: context.dialogeeUsername,
      });
    },
    "asynch9": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      const existing = context.action?.asynch8 || {};
      if (existing.success && existing.user?.id) {
        context.dialogeeUser = existing.user;
        return '';
      }
      return helpers.dialogeeJoinCall('createUser', {
        username: context.dialogeeUsername,
        password: context.dialogeePassword,
        name: context.dialogeeName,
      });
    },
    "validation8": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.dialogeeUser?.id) {
        const created = context.action?.asynch9 || {};
        if (created.success && created.user?.id) {
          context.dialogeeUser = created.user;
        }
      }
      if (!context.dialogeeUser?.id) {
        const getUser = context.action?.asynch8 || {};
        const created = context.action?.asynch9 || {};
        return {
          success: false,
          error: created.error || getUser.error || 'ساخت / یافتن کاربر دیالوگی ناموفق بود',
        };
      }
      return true;
    },

    // ---- عضویت کاربر در room ----
    "asynch10": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      return helpers.dialogeeJoinCall('getRoomUsers', {
        id: context.roomId,
      });
    },
    "validation9": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      const result = context.action?.asynch10 || {};
      if (result.success === false) {
        return { success: false, error: result.error || 'دریافت لیست کاربران اتاق ناموفق بود' };
      }
      const docs = Array.isArray(result?.users?.docs) ? result.users.docs : [];
      const id = Number(context.dialogeeUser.id);
      context.needsAddToRoom = !docs.some((row) => Number(row?.id) === id);
      return true;
    },
    "asynch11": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsAddToRoom) return '';
      return helpers.dialogeeJoinCall('addUsersToRoom', {
        id: context.roomId,
        users: [{ user: context.dialogeeUser.id, role: context.dialogeeRole || 1 }],
      });
    },
    "validation10": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      if (!context.needsAddToRoom) return true;
      const addResult = context.action?.asynch11 || {};
      if (addResult.success === false) {
        return { success: false, error: addResult.error || 'افزودن دسترسی کاربر به اتاق ناموفق بود' };
      }
      return true;
    },

    // ---- لینک ورود موقت ----
    "asynch12": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      return helpers.dialogeeJoinCall('getLink', {
        room: context.roomId,
        user: context.dialogeeUser.id,
        ttl: 3600,
      });
    },
    "validation11": function (context, helpers) {
      helpers.dialogeeJoinEnsureUtils();
      const linkResult = context.action?.asynch12 || {};
      if (!linkResult.success || !linkResult.link) {
        return { success: false, error: linkResult.error || 'دریافت لینک ورود ناموفق بود' };
      }
      context.joinUrl = linkResult.link;
      return true;
    },

    "response": function (context, helpers) {
      return {
        success: true,
        room_id: context.roomId,
        room_created: Boolean(context.roomWasCreated),
        dialogee_role: context.dialogeeRole,
        access_role: context.accessRole,
        forceToRedirect: context.joinUrl,
        redirect_url: context.joinUrl,
      };
    }
  }
]