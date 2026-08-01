const faqData = [
    {
        question: "چرا در دوره‌های پدافند غیرعامل شرکت کنیم؟",
        answer:
            "شرکت در این دوره‌ها موجب کسب آمادگی عملیاتی، افزایش توان عملکرد در شرایط بحرانی، دریافت گواهینامه معتبر از سازمان پدافند غیرعامل کشور، بهره‌مندی از دوره‌های دارای مجوز اداری و استخدامی (برای برخی دوره‌ها) و ثبت به‌عنوان دوره ضمن خدمت می‌شود. همچنین این دوره‌ها مطابق ماده ۵ احکام دائمی برنامه‌های توسعه کشور برگزار می‌شوند."
    },
    {
        question: "چرا سامانه جامع آموزش پدافند غیرعامل را انتخاب کنیم؟",
        answer:
            "این سامانه دارای مجوز رسمی از سازمان پدافند غیرعامل کشور بوده و با بیش از ۶ سال تجربه تخصصی، بیش از ۲۰۰ پلن آموزشی را برگزار کرده است. تاکنون بیش از ۱۵۰ هزار فراگیر آموزش دیده‌اند و بیش از ۴۰۰ سازمان دولتی و خصوصی از خدمات این سامانه استفاده کرده‌اند."
    },
    {
        question: "شاخصه‌های متمایز سامانه چیست؟",
        answer:
            "امکان برگزاری دوره‌ها به‌صورت مجازی همزمان و غیرهمزمان، فرآیندمحور بودن آموزش، گزارش‌دهی دقیق از عملکرد فراگیران و سازمان‌ها، برگزاری رویدادهای همزمان با بیش از ۴۰۰ هزار نفر، پایش کامل حضور، فعالیت و ارزیابی نهایی و مناسب بودن برای آموزش‌های فردی و سازمانی از مهم‌ترین ویژگی‌های سامانه است."
    },
    {
        question: "در سامانه چه دوره‌هایی برگزار می‌شود؟",
        answer:
            "دوره‌های اطلاعات ضروری در شرایط جنگی، پدافند غیرعامل سایبری در سطوح مختلف، پدافند سایبری تهدیدات گوشی‌های هوشمند و دوره‌های تخصصی پدافند غیرعامل با رویکردهای مختلف در سامانه برگزار می‌شوند."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id='faq' className="relative w-full bg-[white] py-20 px-10 flex flex-col justify-center items-center rounded-tl-[240px] rounded-br-[240px]" dir="rtl">

            <div className="absolute top-0 -left-[72px] z-0 w-64 h-64 object-cover ">

                <svg width="168" height="232" viewBox="0 0 168 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2_10428)">
                        <rect width="88.0048" height="255.067" rx="44.0024" transform="matrix(-0.5 -0.866025 -0.866025 0.5 101 61.2168)" fill="#F4F4F4" />
                        <g filter="url(#filter0_d_2_10428)">
                            <rect width="106.48" height="308.117" rx="53.24" transform="matrix(-0.5 -0.866025 -0.866025 0.5 185.813 83.9238)" fill="#F0F6FF" />
                        </g>
                        <g filter="url(#filter1_d_2_10428)">
                            <rect width="66.3793" height="216.971" rx="33.1897" transform="matrix(-0.5 -0.866025 -0.866025 0.5 87 57.4863)" fill="white" />
                        </g>
                        <rect width="71.5183" height="215.285" rx="35.7591" transform="matrix(0.5 0.866025 0.866025 -0.5 -135.201 246.932)" fill="white" fill-opacity="0.5" />
                        <g filter="url(#filter2_d_2_10428)">
                            <rect width="60.8366" height="183.131" rx="30.4183" transform="matrix(0.5 0.866025 0.866025 -0.5 -129.168 240.191)" fill="#193680" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_d_2_10428" x="-118.785" y="7.1875" width="289.12" height="215.316" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_10428" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_10428" result="shape" />
                        </filter>
                        <filter id="filter1_d_2_10428" x="-125.949" y="8.14307" width="204.807" height="149.686" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_10428" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_10428" result="shape" />
                        </filter>
                        <filter id="filter2_d_2_10428" x="-122.039" y="155.755" width="174.757" height="129.994" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_10428" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_10428" result="shape" />
                        </filter>
                        <clipPath id="clip0_2_10428">
                            <rect width="168" height="232" fill="white" transform="matrix(-1 0 0 1 168 0)" />
                        </clipPath>
                    </defs>
                </svg>

            </div>
            <div className="absolute -bottom-[8px] right-0 z-0 w-64 h-64 object-cover">

                <svg width="171" height="232" viewBox="0 0 171 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2_10443)">
                        <rect x="67" y="61.2168" width="88.0048" height="255.067" rx="44.0024" transform="rotate(-60 67 61.2168)" fill="#F4F4F4" />
                        <g filter="url(#filter0_d_2_10443)">
                            <rect x="-17.8135" y="83.9238" width="106.48" height="308.117" rx="53.24" transform="rotate(-60 -17.8135 83.9238)" fill="#F0F6FF" />
                        </g>
                        <g filter="url(#filter1_d_2_10443)">
                            <rect x="81" y="57.4863" width="66.3793" height="216.971" rx="33.1897" transform="rotate(-60 81 57.4863)" fill="white" />
                        </g>
                        <rect x="303.201" y="246.932" width="71.5183" height="215.285" rx="35.7591" transform="rotate(120 303.201 246.932)" fill="white" fill-opacity="0.5" />
                        <g filter="url(#filter2_d_2_10443)">
                            <rect x="299.169" y="240.191" width="60.8366" height="183.131" rx="30.4183" transform="rotate(120 299.169 240.191)" fill="#193680" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_d_2_10443" x="-2.33496" y="7.1875" width="289.12" height="215.316" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_10443" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_10443" result="shape" />
                        </filter>
                        <filter id="filter1_d_2_10443" x="89.1426" y="8.14307" width="204.807" height="149.686" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_10443" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_10443" result="shape" />
                        </filter>
                        <filter id="filter2_d_2_10443" x="117.283" y="155.755" width="174.757" height="129.994" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_10443" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_10443" result="shape" />
                        </filter>
                        <clipPath id="clip0_2_10443">
                            <rect width="171" height="232" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

            </div>
            <div className="w-full text-center mb-12 relative z-20">
                <h2 className="text-2xl md:text-3xl font-bold">
                    <span className="text-gray-800">سوالات </span>
                    <span className="text-[#CCA955]">متداول</span>
                </h2>
            </div>
            <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row items-center gap-[7.5rem]" style={{ flexDirection: "row-reverse" }}>
                <div className="flex-1 w-full flex justify-center">
                    <div className="flex flex-col gap-0" style={{ width: "688px" }}>
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className="border-b backdrop-blur-sm rounded-lg px-2"
                                style={{ borderColor: "#EDEDED" }}
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between items-center text-[#1e3b7b] font-medium text-lg py-3 hover:text-blue-800 transition-colors"
                                >
                                    <span>{item.question}</span>
                                    <svg
                                        className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </button>

                                {/* بخش انیمیشن نرم */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${openIndex === index
                                        ? "grid-rows-[1fr] opacity-100 pb-4"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden text-gray-600 pr-2">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>


                <div className="flex-1 flex justify-center items-center relative">
                    <div className="absolute -top-[72px] left-[100%] transform -translate-x-1/2 -translate-y-1/2 z-30">
                        <svg width="126" height="118" viewBox="0 0 126 118" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M79.0576 111.078V107.097C79.0576 106.886 78.9737 106.683 78.8243 106.534C78.675 106.385 78.4725 106.301 78.2613 106.301C78.0501 106.301 77.8476 106.385 77.6983 106.534C77.5489 106.683 77.465 106.886 77.465 107.097V111.078H73.4838C73.2726 111.078 73.07 111.162 72.9207 111.312C72.7714 111.461 72.6875 111.663 72.6875 111.875C72.6875 112.086 72.7714 112.288 72.9207 112.438C73.07 112.587 73.2726 112.671 73.4838 112.671H77.465V116.652C77.465 116.863 77.5489 117.066 77.6983 117.215C77.8476 117.364 78.0501 117.448 78.2613 117.448C78.4725 117.448 78.675 117.364 78.8243 117.215C78.9737 117.066 79.0576 116.863 79.0576 116.652V112.671H83.0388C83.25 112.671 83.4526 112.587 83.6019 112.438C83.7512 112.288 83.8351 112.086 83.8351 111.875C83.8351 111.663 83.7512 111.461 83.6019 111.312C83.4526 111.162 83.25 111.078 83.0388 111.078H79.0576Z" fill="#CCA955" />
                            <path d="M7.00721 10.7319L3.40266 12.6267L4.0911 8.61286L1.17383 5.77033L5.20406 5.18466L7.00721 1.53223L8.80977 5.18466L12.84 5.77033L9.92331 8.61286L10.6123 12.6267L7.00721 10.7319Z" fill="#CCA955" />
                            <path d="M42.6356 57.0759V54.9525C42.6356 54.8399 42.5909 54.7319 42.5113 54.6522C42.4316 54.5726 42.3236 54.5278 42.211 54.5278C42.0983 54.5278 41.9903 54.5726 41.9107 54.6522C41.831 54.7319 41.7863 54.8399 41.7863 54.9525V57.0759H39.663C39.5503 57.0759 39.4423 57.1206 39.3627 57.2002C39.283 57.2799 39.2383 57.3879 39.2383 57.5005C39.2383 57.6132 39.283 57.7212 39.3627 57.8008C39.4423 57.8805 39.5503 57.9252 39.663 57.9252H41.7863V60.0485C41.7863 60.1612 41.831 60.2692 41.9107 60.3488C41.9903 60.4285 42.0983 60.4732 42.211 60.4732C42.3236 60.4732 42.4316 60.4285 42.5113 60.3488C42.5909 60.2692 42.6356 60.1612 42.6356 60.0485V57.9252H44.759C44.8716 57.9252 44.9796 57.8805 45.0593 57.8008C45.1389 57.7212 45.1837 57.6132 45.1837 57.5005C45.1837 57.3879 45.1389 57.2799 45.0593 57.2002C44.9796 57.1206 44.8716 57.0759 44.759 57.0759H42.6356Z" fill="#CCA955" />
                            <g clip-path="url(#clip0_2_10340)">
                                <path d="M121.228 92.0278C119.469 92.0278 118.043 90.6018 118.043 88.8427C118.043 87.0837 119.469 85.6577 121.228 85.6577C122.987 85.6577 124.413 87.0837 124.413 88.8427C124.413 90.6018 122.987 92.0278 121.228 92.0278Z" fill="#CCA955" />
                            </g>
                            <path d="M93.9902 42.4756L96.8049 39.66C96.881 39.5866 96.9416 39.4987 96.9834 39.4015C97.0251 39.3044 97.0471 39.1999 97.048 39.0942C97.0489 38.9885 97.0288 38.8836 96.9887 38.7858C96.9487 38.6879 96.8896 38.599 96.8148 38.5242C96.74 38.4495 96.6511 38.3903 96.5533 38.3503C96.4554 38.3103 96.3506 38.2901 96.2448 38.291C96.1391 38.292 96.0346 38.3139 95.9375 38.3557C95.8403 38.3974 95.7525 38.4581 95.679 38.5341L92.8635 41.3489L90.0487 38.5341C89.9752 38.4581 89.8874 38.3974 89.7902 38.3557C89.6931 38.3139 89.5886 38.292 89.4829 38.291C89.3771 38.2901 89.2723 38.3103 89.1744 38.3503C89.0766 38.3903 88.9877 38.4495 88.9129 38.5242C88.8381 38.599 88.779 38.6879 88.739 38.7858C88.6989 38.8836 88.6788 38.9885 88.6797 39.0942C88.6806 39.1999 88.7026 39.3044 88.7443 39.4015C88.7861 39.4987 88.8467 39.5866 88.9228 39.66L91.7375 42.4748L88.9228 45.2903C88.8467 45.3638 88.7861 45.4517 88.7443 45.5488C88.7026 45.646 88.6806 45.7504 88.6797 45.8562C88.6788 45.9619 88.6989 46.0667 88.739 46.1646C88.779 46.2625 88.8381 46.3514 88.9129 46.4261C88.9877 46.5009 89.0766 46.56 89.1744 46.6C89.2723 46.6401 89.3771 46.6602 89.4829 46.6593C89.5886 46.6584 89.6931 46.6364 89.7902 46.5947C89.8874 46.553 89.9752 46.4923 90.0487 46.4163L92.8635 43.6015L95.679 46.4163C95.7525 46.4923 95.8403 46.553 95.9375 46.5947C96.0346 46.6364 96.1391 46.6584 96.2448 46.6593C96.3506 46.6602 96.4554 46.6401 96.5533 46.6C96.6511 46.56 96.74 46.5009 96.8148 46.4261C96.8896 46.3514 96.9487 46.2625 96.9887 46.1646C97.0288 46.0667 97.0489 45.9619 97.048 45.8562C97.0471 45.7504 97.0251 45.646 96.9834 45.5488C96.9416 45.4517 96.881 45.3638 96.8049 45.2903L93.9902 42.4748V42.4756Z" fill="#CCA955" />
                            <defs>
                                <clipPath id="clip0_2_10340">
                                    <rect width="7.64407" height="7.64407" fill="white" transform="translate(117.406 85)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                    <svg width="251" height="248" viewBox="0 0 251 248" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.2091 188.835L4.18848 183.135L4.77741 168.359L146.556 122.006L250.271 173.969L116.924 240.771L13.2091 188.835Z" fill="#CCA955" />
                        <path d="M116.731 247.828L250.079 181.026V173.604L116.731 240.406V247.828Z" fill="#CCA955" />
                        <path d="M250.082 143.723L116.735 210.522L13.0195 158.586L146.367 91.7583L250.082 143.723Z" fill="#CCA955" />
                        <path d="M10.6806 159.331L13.0223 158.586V165.985C5.40167 168.462 2.72674 180.823 10.0525 186.487L13.0223 188.47V195.868C13.0223 195.868 10.9951 194.976 6.7242 191.981C-4.04833 184.426 -1.25673 163.123 10.6806 159.331Z" fill="#CCA955" />
                        <path d="M13.7197 162.649L32.3444 173.522L117.816 215.813L238.331 155.439V175.738L117.816 236.112L13.7197 184.156V162.649Z" fill="white" />
                        <path d="M116.636 235.522L13.7197 184.156V162.648L32.3444 173.521L116.243 215.034L116.636 235.522Z" fill="#EBEFFF" />
                        <path d="M13.0225 195.866L116.737 247.828V240.406L13.0225 188.469V195.866Z" fill="#CCA955" />
                        <path d="M13.0225 165.984L116.737 217.946V210.524L13.0225 158.587V165.984Z" fill="#CCA955" />
                        <path d="M116.731 217.947L250.079 151.144V143.722L116.731 210.524V217.947Z" fill="#CCA955" />
                        <path d="M236.268 56.2508V60.7062L124.025 116.966L11.7207 60.6997V56.2451L236.268 56.2508Z" fill="#375EA9" />
                        <path d="M61.4014 71.5483V123.249C61.4014 141.179 89.6823 155.712 124.567 155.712C159.451 155.712 187.731 141.179 187.731 123.249V71.5483H61.4014Z" fill="#193680" />
                        <g opacity="0.11319">
                            <path d="M62.5363 86.1589C60.832 86.576 79.6807 109.049 110.86 124.17C129.014 132.974 163.545 134.909 183.249 135.262C186.133 131.545 187.734 127.494 187.734 123.25V84.7293L105.158 72.8477C105.158 72.8477 65.1403 85.5214 62.5363 86.1589Z" fill="black" />
                        </g>
                        <path d="M11.7207 60.6999L123.994 4.45508L236.268 60.7055L124.025 116.966L11.7207 60.6999Z" fill="#3960A7" />
                        <path d="M11.7207 56.2448L123.994 0L236.268 56.2505L124.025 112.511L11.7207 56.2448Z" fill="#193680" />
                        <path d="M124.025 116.966V112.512L11.7207 56.2451V60.6997L124.025 116.966Z" fill="#4E75C1" />
                        <path d="M179.595 142.218H184.291C187.004 142.218 189.145 140.218 188.947 137.871L186.599 127.284C186.42 125.167 184.388 123.529 181.942 123.529C179.498 123.529 177.467 125.167 177.288 127.284L174.938 137.871C174.741 140.218 176.883 142.218 179.595 142.218Z" fill="#EABD70" />
                        <path d="M180.864 141.533H183.127V82.3228L121.127 50.5962L119.978 52.2881L180.864 83.4429V141.533Z" fill="#EABD70" />
                        <path d="M187.177 116.021C187.177 118.543 184.822 120.587 181.914 120.587C179.008 120.587 176.651 118.543 176.651 116.021C176.651 113.499 179.008 111.454 181.914 111.454C184.822 111.454 187.177 113.499 187.177 116.021Z" fill="#EABD70" />
                    </svg>

                </div>
            </div>
        </div>
    );
};

