export function ScheduleCard({ schedule, implement, allData }) {
  const [open, setOpen] = useState(false);

  const logic = useImplCardLogic({
    course: implement,
    academyName: 'padafandac',
    userImplementsList: allData.userImplementsList,
    implementList: allData.implementsList,
  });

  const academyId = $data?.user?.meta?.academyId;
  const {
    enterUrlLMS,
    enterUrlDialogee,
  } = useImplCardUrls({
    course: implement,
    academyId,
  });

  const vleMap = {
    enableWebinar: 'همایش',
    enableClassroom: 'کلاس',
    enableSocialLMS: 'سامانه مدیریت یادگیری اجتماعی',
    enableCourseware: 'دوره',
    enableInteractiveContent: 'بستر تعاملی',
    enableLearningQuiz: 'آزمون یادگیری',
    enableExam: 'آزمون',
    enableDialogSystem: 'محیط یادگیری'
  }
  const vleData = implement?.vle || {};
  const activeVleFeatures = Object.keys(vleMap)
    .filter(key => vleData[key] === true)
    .map(key => ({
      key: key,
      label: vleMap[key],
      implementId: vleData[`${key.replace('enable', '')}ImplementId`] || null
    }));


  const now = $data?.now;
  const subscribeEnd = new Date(implement?.subscribe?.end);
  const scheduleEnd = new Date(implement?.schedule?.end);
  let statusLabel = "پایان ثبت نام";
  let statusTime = implement?.subscribe?.end;
  if (now > subscribeEnd && now <= scheduleEnd) {
    statusLabel = "پایان دوره";
    statusTime = implement?.schedule?.end;
  }
  if (now > scheduleEnd) {
    statusLabel = "اتمام دوره";
    statusTime = implement?.schedule?.end;
  }

  const timer = logic.getRemainingTime(logic.remainingTime);


  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-2 shadow-sm">
        {/* Header Title And Status And Timer */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${logic.isEnd(implement?.subscribe, implement?.schedule) && Object.keys(implement?.subscribe).length > 0 && Object.keys(implement?.schedule).length > 0
                ? "bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,.6)]"
                : "bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,.6)]"
                }`}
            />
            <h3 className="text-[#444444] font-bold">
              {implement.name}
            </h3>
          </div>

          {logic.remainingTime && logic.remainingTime != 0 ? (
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3">
              <div className="mb-2 text-center text-xs font-semibold text-[#1C3A82]">
                ⏳ زمان باقی‌مانده تا شروع دوره
                </div>

              <div className="flex justify-center gap-2">
                <TimeBox value={timer.seconds} label="ثانیه" />
                <TimeBox value={timer.minutes} label="دقیقه" />
                <TimeBox value={timer.hours} label="ساعت" />
                <TimeBox value={timer.days} label="روز" />
              </div>
            </div>
          ) : <div></div>}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center divide-x divide-x-reverse divide-gray-100">
          {activeVleFeatures.length > 0 && (
            <ScheduleItem
              icon="monitor"
              label="محیط یادگیری"
              value={activeVleFeatures}
            />
          )}
          <ScheduleItem
            icon="book"
            label="هزینه آموزش"
            value={getCertificationPrice(implement.certification)}
          />
          <ScheduleItem
            icon="certificate"
            label="گواهینامه"
            value={implement.certification?.enable ? 'دارد' : 'ندارد'}
          />
          <ScheduleItem
            icon="calendar"
            label={statusLabel}
            value={
              statusLabel !== "اتمام دوره" ? new Date(statusTime).toLocaleDateString('fa-IR') : null
            }
          />
        </div>

        {/* Buttons Action */}
        <div className="flex justify-between items-center mt-auto">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-white border border-[#193680] rounded-lg text-[#193680] hover:bg-gray-50 transition-colors text-sm"
          >مشاهده جزئیات</button>

          {/* More Buttons Action... */}
          <div className="flex justify-end mt-auto gap-2">
            <CertificateButtons
              pass={logic.isPassed(implement.id)}
              certEnabled={logic.certificateEnabled()}
              course={implement}
              academyName={logic.userCourse?.academyName}
              userCourse={logic.userCourse}
            />
            <CourseActions
              subscribed={logic.subscribeUser(implement.id)}
              course={implement}
              academyId={academyId}
              paymentReq={paymentReq}
              enterUrlLMS={enterUrlLMS}
              enterUrlDialogee={enterUrlDialogee}
            />
          </div>
        </div>

      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="جزئیات برگزاری" width="max-w-xl">
        <div>
          <h2 className="text-[10px] text-[#1C3A82] mb-5">{implement.name}</h2>
          <p dangerouslySetInnerHTML={{ __html: implement.desc }} />

          <hr className="my-2" />

          {implement.tags && implement.tags.length > 0 &&
            implement.tags.map((item, i) => (
              <Badge key={i} className="m-1">{item}</Badge>
            ))}
        </div>
      </Modal>

    </>
  );
}


export function ScheduleSection({ implementsList, allData }) {

  const getPriority = (implement) => {

    const subscribeUser = implementId =>
      allData.userImplementsList?.some(
        item => item.impl == implementId
      )

    const courseScore = implementId =>
      Number(
        allData.userImplementsList?.find(
          item => item.impl === implementId
        )?.course?.score
      )

    const minScore = implementId =>
      Number(
        implementsList?.find(
          item => item.id === implementId
        )?.certification?.minScore
      ) || 60

    const isPassed = implementId =>
      courseScore(implementId) >= (minScore(implementId) || 60)

    const isEnd = (subscribe, schedule) => {

      if (!subscribe?.start || !schedule?.end)
        return true

      const now = $data?.now

      const start = new Date(subscribe.start)
      const end = new Date(schedule.end)

      return now > start && now < end
    }

    const userCourse = allData.userImplementsList?.find(
      item => item.impl === implement.id
    )
    const certificateEnabled = () =>
      DC?.service?.id === "zemnekhedmat.edus.ir" &&
      userCourse &&
      new Date(implement?.schedule?.end) < $data?.now


    // ۱. دوره‌های فعال
    if (
      isEnd(implement?.subscribe, implement?.schedule) &&
      Object.keys(implement?.subscribe || {}).length > 0 &&
      Object.keys(implement?.schedule || {}).length > 0
    ) {
      return 1;
    }

    // ۲. پاس شده یا امکان دریافت گواهی فعال است
    if (isPassed(implement.id) || certificateEnabled()) {
      return 2;
    }

    // ۳. رایگان (بدون مبلغ در fee.default)
    if (!implement?.subscribe?.fee?.default?.[0]?.amount) {
      return 3;
    }

    // ۴. کاربر در آن ثبت‌نام نکرده
    if (!subscribeUser(implement.id)) {
      return 4;
    }

    // بقیه موارد در انتهای لیست
    return 5;
  };

  const sortedImplementsList = useMemo(() => {
    return [...implementsList].sort((a, b) => getPriority(a) - getPriority(b));
  }, [implementsList]);

  return (
    <div style={{ border: "1px solid #EDEDED", borderRadius: "16px", padding: "16px" }}>
      <h2 className="text-[#404040] !text-[16px] !font-normal mb-4 pr-2">
        لیست برگزاری‌ها
      </h2>

      <div className="space-y-4">
        {sortedImplementsList && sortedImplementsList.length && sortedImplementsList.map((im) => (
          <ScheduleCard key={im.id} implement={im} allData={allData} />
        ))}
      </div>
    </div>);
}


export function CourseDetails() {
  const [data, reload] = useDataProvider({
    provider: 'ds/academy-V2/courses/load',
    params: { planId: DC.page.uriParams.param1 },
    onSuccess: (res) => {
      const { implementsList, planDoc, userImplementsList } = res?.data || {}
      $data.now = new Date(res?.data?.now)

      $data.dataProvider = {
        ...$data.dataProvider || {},
        implementsList,
        planDoc,
        userImplementsList,
        reload
      }
    },
  });
  const allData = data?.data;
  const implementsList = data?.data?.implementsList || [];

  const getPriority = (implement) => {

    const subscribeUser = implementId =>
      allData.userImplementsList?.some(
        item => item.impl == implementId
      )

    const courseScore = implementId =>
      Number(
        allData.userImplementsList?.find(
          item => item.impl === implementId
        )?.course?.score
      )

    const minScore = implementId =>
      Number(
        implementsList?.find(
          item => item.id === implementId
        )?.certification?.minScore
      ) || 60

    const isPassed = implementId =>
      courseScore(implementId) >= (minScore(implementId) || 60)

    const isEnd = (subscribe, schedule) => {

      if (!subscribe?.start || !schedule?.end)
        return true

      const now = $data?.now

      const start = new Date(subscribe.start)
      const end = new Date(schedule.end)

      return now > start && now < end
    }

    const userCourse = allData.userImplementsList?.find(
      item => item.impl === implement.id
    )
    const certificateEnabled = () =>
      DC?.service?.id === "zemnekhedmat.edus.ir" &&
      userCourse &&
      new Date(implement?.schedule?.end) < $data?.now


    // ۱. دوره‌های فعال
    if (
      isEnd(implement?.subscribe, implement?.schedule) &&
      Object.keys(implement?.subscribe || {}).length > 0 &&
      Object.keys(implement?.schedule || {}).length > 0
    ) {
      return 1;
    }

    // ۲. پاس شده یا امکان دریافت گواهی فعال است
    if (isPassed(implement.id) || certificateEnabled()) {
      return 2;
    }

    // ۳. رایگان (بدون مبلغ در fee.default)
    if (!implement?.subscribe?.fee?.default?.[0]?.amount) {
      return 3;
    }

    // ۴. کاربر در آن ثبت‌نام نکرده
    if (!subscribeUser(implement.id)) {
      return 4;
    }

    // بقیه موارد در انتهای لیست
    return 5;
  };

  const sortedImplementsList = useMemo(() => {
    return [...implementsList].sort((a, b) => getPriority(a) - getPriority(b));
  }, [implementsList]);

  if (!data) return <div className="flex items-center justify-center min-h-screen">در حال بارگذاری...</div>;


  return (
    <div
      className="min-h-screen bg-[#FAFAFA]"
      dir="rtl"
      style={{ fontFamily: "iransans" }}
    >
      <Header />
      <BackButtonV2 className="max-w-[1000px] mx-auto flex justify-start ml-[532px] md:px-20" href="/details" title="بازگشت به صفحه جزئیات" />

      <div className="max-w-[1000px] mx-auto space-y-6 mb-[25px]">
        <CourseCard course={course} allData={allData} sortedImplementsList={sortedImplementsList} />
        <ScheduleSection implementsList={implementsList} allData={allData} />
      </div>

      <Footer />
    </div>
  );
}
