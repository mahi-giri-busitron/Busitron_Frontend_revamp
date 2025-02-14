import { Carousel } from "primereact/carousel";

const services = [
    {
        title: "E-Commerce Website",
        icon: "pi pi-shop",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKo2hdasSNC_JJ-r9LzxlVYPOXOoTotzROA&s",
        category: "Web Development",
        status: "Completed",
        description:
            "1A fully functional e-commerce website with payment gateway integration, user authentication, and a responsive UI.",
    },
    {
        title: "Company Portfolio Website",
        icon: "pi pi-address-book",
        image: "https://w3layouts.b-cdn.net//wp-content/uploads/2015/12/onepageportfolio-future.jpg",
        category: "Web Design",
        status: "Completed",
        description:
            "2A sleek and modern company portfolio website showcasing services, testimonials, and case studies.",
    },
    {
        title: "AI-Powered Chatbot",
        icon: "pi pi-comments",
        image: "https://ddi-dev.com/uploads/media/news/0001/02/584668831a98d094bf9ceb0a533d0984149e044f.jpeg",
        category: "AI & Automation",
        status: "Ongoing",
        description:
            "3A chatbot that automates customer support using AI and natural language processing (NLP).",
    },
    {
        title: "Healthcare Management System",
        icon: "pi pi-briefcase",
        image: "https://docpulse.com/wp-content/uploads/2024/02/slider-small-1.jpg",
        category: "Software Development",
        status: "Completed",
        description:
            "4A management system for hospitals and clinics with appointment scheduling and patient record management.",
    },
    {
        title: "Real Estate Listing Platform",
        icon: "pi pi-building",
        image: "https://oril.co/wp-content/uploads/2021/12/realtor-1.png",
        category: "Web Development",
        status: "Ongoing",
        description:
            "5A real estate website allowing users to list, search, and filter properties with a dynamic map integration.",
    },
    {
        title: "SaaS Dashboard",
        icon: "pi pi-chart-bar",
        image: "https://adminkit.io/static/eb84da92af6e3f6d447a6c90a1d6dc4b/3a874/bootstrap-saas-dashboard.png",
        category: "UI/UX Design",
        status: "Completed",
        description:
            "6A modern SaaS analytics dashboard with interactive charts, reports, and a user-friendly interface.",
    },
    {
        title: "E-Commerce Website",
        icon: "pi pi-shop",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKo2hdasSNC_JJ-r9LzxlVYPOXOoTotzROA&s",
        category: "Web Development",
        status: "Completed",
        description:
            "7A fully functional e-commerce website with payment gateway integration, user authentication, and a responsive UI.",
    },
    {
        title: "Company Portfolio Website",
        icon: "pi pi-address-book",
        image: "https://w3layouts.b-cdn.net//wp-content/uploads/2015/12/onepageportfolio-future.jpg",
        category: "Web Design",
        status: "Completed",
        description:
            "8A sleek and modern company portfolio website showcasing services, testimonials, and case studies.",
    },
    {
        title: "AI-Powered Chatbot",
        icon: "pi pi-comments",
        image: "https://ddi-dev.com/uploads/media/news/0001/02/584668831a98d094bf9ceb0a533d0984149e044f.jpeg",
        category: "AI & Automation",
        status: "Ongoing",
        description:
            "9A chatbot that automates customer support using AI and natural language processing (NLP).",
    },
    {
        title: "E-Commerce Website",
        icon: "pi pi-shop",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVKo2hdasSNC_JJ-r9LzxlVYPOXOoTotzROA&s",
        category: "Web Development",
        status: "Completed",
        description:
            "10A fully functional e-commerce website with payment gateway integration, user authentication, and a responsive UI.",
    },
    {
        title: "Company Portfolio Website",
        icon: "pi pi-address-book",
        image: "https://w3layouts.b-cdn.net//wp-content/uploads/2015/12/onepageportfolio-future.jpg",
        category: "Web Design",
        status: "Completed",
        description:
            "11A sleek and modern company portfolio website showcasing services, testimonials, and case studies.",
    },
    {
        title: "AI-Powered Chatbot",
        icon: "pi pi-comments",
        image: "https://ddi-dev.com/uploads/media/news/0001/02/584668831a98d094bf9ceb0a533d0984149e044f.jpeg",
        category: "AI & Automation",
        status: "Ongoing",
        description:
            "12A chatbot that automates customer support using AI and natural language processing (NLP).",
    },
];

const Projects = () => {
    const ProjectTemplate1 = (service) => {
        return (
            <div className="group rounded-xl border-2  border-white mx-[20px] text-center service-item bg-white  overflow-hidden  hover:border-cyan-500  hover:border-2  flex flex-col  max-w-[350px] h-full shadow-lg hover:shadow-lg transition-shadow duration-300">
                <div className="img  ">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full aspect-3/2 object-cover   transition-timing-function: linear; duration-800  group-hover:scale-120  transition-transform "
                    />
                </div>
                <div className=" details text-center p-6  relative flex flex-col justify-between   ">
                    <div className="icon w-18 h-18 bg-blue-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg -mt-10 mx-auto group-hover:border-blue-500 group-hover:bg-white group-hover:text-blue-500 transition-colors duration-300">
                        <i className={`${service.icon} text-2xl`}></i>
                    </div>
                    <h3 className="md:text-lg xl:text-xl font-semibold mt-4 mb-2">
                        {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-md xl:text-lg leading-relaxed max-h-[200px] overflow-hidden">
                        {service.description}
                    </p>
                </div>
            </div>
        );
    };

    const responsiveOptions = [
        {
            breakpoint: "1200px",
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "900px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "575px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-700 p-6">
            <div className="container xs-p-0 md-px-5 py-24 mx-auto max-w-[1240px]">
                <div className="container mx-auto  text-center p-3 pb-5">
                    <h2 className="text-4xl font-bold text-white ">
                        Our Projects
                    </h2>
                    <p className="mt-4 text-gray-100 max-w-2xl mx-auto">
                        We offer a comprehensive solution for top-quality web
                        design and development services. Our customized,
                        budget-friendly web design options are tailored to meet
                        your specific needs.
                    </p>
                </div>
                <div>
                    <Carousel
                        circular
                        value={services}
                        numVisible={3}
                        numScroll={1}
                        responsiveOptions={responsiveOptions}
                        itemTemplate={ProjectTemplate1}
                    />
                </div>
            </div>
        </div>
    );
};

export default Projects;
