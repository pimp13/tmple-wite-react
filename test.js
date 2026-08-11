import fs from "node:fs";

const stripHtml = (html = "") => {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};
export const truncate = (text, length = 80) => {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
};

const data = fs.readFileSync("./MockFreeCoursesForLandingData.json", "utf-8");

const courses = JSON.parse(data);
const freeCourses = courses.freeCourses;
const vizeSazmanCourse = courses.vizeSazmanCourse;

const finalFreeCourses = freeCourses.map((c) => {
  const recommendation = c.recommendations?.[0] || {};
  return {
    id: c.rand_id,
    title: c.meta?.name,
    subtitle: truncate(stripHtml(c.meta?.desc || "")),
    startDate: recommendation.start_time,
    endDate: recommendation.end_time,
    price: 0,
    oldPrice: 0,
    discount: 0,
    rating: 4.5,
    image: recommendation.meta?.thumb || "",
    imageBg: "#F0E1E5",
    isSpecial: true,
    type: "free",
  };
});
// console.log(finalFreeCourses);

const finalVizeSazmanCourse = vizeSazmanCourse.map((c) => {
  return {
    id: c.id,
    title: c.plmeta?.name,
    subtitle: truncate(stripHtml(c.data?.desc || "")),
    startDate: c.immeta?.subscribe?.start || '',
    endDate: c.immeta?.subscribe?.end || '',
    price: c?.immeta?.subscribe?.fee?.default?.[0]?.amount || 0,
    oldPrice: 0,
    discount: 0,
    rating: 4.5,
    image: c.plmeta?.thumb || "",
    imageBg: "#F0E1E5",
    isSpecial: true,
    type: "organizations",
  };
});
