import Image from "next/image";
import {gyre_adventor, manrope, space_grotesk} from '@/fonts';
import { CornerRightUp } from "lucide-react";
import {
  MotionArticle,
  MotionBlock,
  MotionFeatureCard,
  MotionHeroBackground,
  MotionHeroItem,
  MotionHeroTitle,
  MotionLink,
  MotionRoot,
  MotionRule,
  MotionSection,
  MotionServiceItem,
} from "./home-motion";
import LionMark from "./components/lion-mark";
const services = [
  {
    eyebrow: "Renovation",
    title: "Home & Bathroom",
    description:
      "Complete renovations for homes, apartments, and bathrooms, including water, drainage, electrical work, tiling, and finishing.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=85",
    alt: "Renovation tools and building materials inside a home",
    href:"/renovations"
  },
  {
    eyebrow: "Cleaning",
    title: "Professional Cleaning",
    description:
      "Reliable cleaning for homes, hotels, offices, and industrial spaces, planned around your schedule.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=85",
    alt: "Professional cleaner working by a window",
    href:"/cleaning"
  },
  {
    eyebrow: "Workforce",
    title: "Qualified Personnel",
    description:
      "Flexible teams for short and long projects, selected for experience, work ethic, and reliability.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
    alt: "Team of professionals discussing a project plan",
    href:"/workforce"
  },
];

const heroItems = [
  { label: "Renovations", icon: "renovation", delay: 0.36 },
  { label: "Cleaning", icon: "cleaning", delay: 0.45 },
  { label: "Workforce", icon: "workforce", delay: 0.54 },
];

// function LionMark({ className = "" }: { className?: string }) {
//   return (
//     <Image
//       className={className}
//       src="/logoblack.svg"
//       alt="Pluto Prime lion logo"
//       width={170}
//       height={170}
//       priority
//       quality={100}
//       />
//   );
// }



function ServiceIcon({ name }: { name: string }) {
  if (name === "renovation") {
    return (
      <svg
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <defs>
            <linearGradient
              id="hero-renovation-gradient"
              x1="0"
              y1="0"
              x2="24"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ECC560" />
              <stop offset="1" stopColor="#A76B0B" />
            </linearGradient>
          </defs>

          {" "}
          <path
            d="M11 16C11 15.0681 11 14.6022 11.1522 14.2346C11.3552 13.7446 11.7446 13.3552 12.2346 13.1522C12.6022 13 13.0681 13 14 13H16.8C17.9201 13 18.4802 13 18.908 12.782C19.2843 12.5903 19.5903 12.2843 19.782 11.908C20 11.4802 20 10.9201 20 9.8V9.2C20 8.07989 20 7.51984 19.782 7.09202C19.5903 6.71569 19.2843 6.40973 18.908 6.21799C18.4802 6 17.9201 6 16.8 6H16M16 6C16 6.93188 16 7.39782 15.8478 7.76537C15.6448 8.25542 15.2554 8.64477 14.7654 8.84776C14.3978 9 13.9319 9 13 9H7C6.06812 9 5.60218 9 5.23463 8.84776C4.74458 8.64477 4.35523 8.25542 4.15224 7.76537C4 7.39782 4 6.93188 4 6C4 5.06812 4 4.60218 4.15224 4.23463C4.35523 3.74458 4.74458 3.35523 5.23463 3.15224C5.60218 3 6.06812 3 7 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6448 3.74458 15.8478 4.23463C16 4.60218 16 5.06812 16 6ZM10.6 21H11.4C11.9601 21 12.2401 21 12.454 20.891C12.6422 20.7951 12.7951 20.6422 12.891 20.454C13 20.2401 13 19.9601 13 19.4V17.6C13 17.0399 13 16.7599 12.891 16.546C12.7951 16.3578 12.6422 16.2049 12.454 16.109C12.2401 16 11.9601 16 11.4 16H10.6C10.0399 16 9.75992 16 9.54601 16.109C9.35785 16.2049 9.20487 16.3578 9.10899 16.546C9 16.7599 9 17.0399 9 17.6V19.4C9 19.9601 9 20.2401 9.10899 20.454C9.20487 20.6422 9.35785 20.7951 9.54601 20.891C9.75992 21 10.0399 21 10.6 21Z"
            stroke="url(#hero-renovation-gradient)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </g>
      </svg>


    );
  }

  if (name === "cleaning") {
    return (
      <svg
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <g id="SVGRepo_iconCarrier">

          <defs>
            <linearGradient
              id="hero-cleaning-gradient"
              x1="0"
              y1="0"
              x2="24"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ECC560" />
              <stop offset="1" stopColor="#A76B0B" />
            </linearGradient>
          </defs>

          {" "}
          <path
            d="M9.87 5.66998L6.45 7.74999L4.89001 5.19C4.32001 4.25 4.62 3.01 5.56 2.44C6.5 1.87 7.74 2.16998 8.31 3.10998L9.87 5.66998Z"
            stroke="url(#hero-cleaning-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M11.82 9.15997L8.66 11.08C6.82 12.2 6.25999 14.46 7.14999 16.26L9.19999 20.44C9.85999 21.79 11.46 22.26 12.74 21.47L19.17 17.56C20.46 16.78 20.77 15.15 19.88 13.94L17.11 10.2C15.91 8.58001 13.66 8.03997 11.82 9.15997Z"
            stroke="url(#hero-cleaning-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M10.7567 5.09791L5.63208 8.21851L7.71248 11.6349L12.8371 8.51431L10.7567 5.09791Z"
            stroke="url(#hero-cleaning-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M14.31 16.8101L15.96 19.5201"
            stroke="url(#hero-cleaning-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M11.75 18.37L13.4 21.08"
            stroke="url(#hero-cleaning-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
          <path
            d="M16.87 15.25L18.52 17.96"
            stroke="url(#hero-cleaning-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </g>
      </svg>



    );
  }

  return (
    <svg
      fill="url(#hero-workforce-gradient)"
      height="64px"
      width="64px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <defs>
        <linearGradient
          id="hero-workforce-gradient"
          x1="0"
          y1="0"
          x2="512"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ECC560" />
          <stop offset="1" stopColor="#A76B0B" />
        </linearGradient>
      </defs>
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <g>
              {" "}
              <circle cx="256.001" cy="232.132" r="10.689" />{" "}
              <circle cx="256.001" cy="268.111" r="10.689" />{" "}

              
              <path d="M423.565,112.31c5.87-8.252,9.338-18.327,9.338-29.203V50.505C432.903,22.656,410.247,0,382.398,0h-6.948 c-27.849,0-50.505,22.656-50.505,50.505v32.601c0,10.843,3.446,20.889,9.284,29.127h-33.534 c5.838-8.238,9.285-18.284,9.285-29.127V50.505C309.98,22.656,287.324,0,259.475,0h-6.948c-27.849,0-50.505,22.656-50.505,50.505 v32.601c0,10.843,3.447,20.889,9.287,29.127h-33.534c5.837-8.238,9.283-18.284,9.283-29.127V50.505 C187.057,22.656,164.401,0,136.552,0h-6.948c-27.849,0-50.505,22.656-50.505,50.505v32.601c0,10.876,3.467,20.951,9.338,29.203 c-37.537,1.572-67.593,32.454-67.593,70.204v104.217c0,21.66,17.689,39.282,39.434,39.282c0.219,0,0.434-0.019,0.65-0.033 v150.391c0,19.646,15.983,35.629,35.629,35.629h11.579c9.701,0,18.509-3.897,24.94-10.208c6.432,6.311,15.24,10.208,24.94,10.208 h11.579c9.703,0,18.498-3.914,24.93-10.228c6.433,6.32,15.243,10.228,24.952,10.228h11.579c9.701,0,18.509-3.897,24.94-10.208 c6.432,6.311,15.24,10.208,24.941,10.208h11.58c9.709,0,18.52-3.908,24.952-10.228c6.43,6.314,15.225,10.228,24.929,10.228h11.58 c9.7,0,18.509-3.897,24.94-10.208c6.432,6.311,15.24,10.208,24.941,10.208h11.58c19.646,0,35.629-15.983,35.629-35.629V325.979 c0.216,0.013,0.431,0.033,0.65,0.033c21.743,0,39.434-17.622,39.434-39.282V182.514 C491.158,144.763,461.102,113.882,423.565,112.31z M346.323,50.505c0-16.061,13.067-29.127,29.127-29.127h6.948 c16.06,0,29.127,13.066,29.127,29.127v32.601c0,16.061-13.067,29.127-29.127,29.127h-6.948c-16.06,0-29.127-13.066-29.127-29.127 V50.505z M223.4,50.505c0-16.061,13.066-29.127,29.127-29.127h6.948c16.06,0,29.127,13.066,29.127,29.127v32.601 c0,16.061-13.067,29.127-29.127,29.127h-6.948c-16.061,0-29.127-13.066-29.127-29.127V50.505z M280.722,133.612l-24.721,40.565 l-24.721-40.565H280.722z M100.477,50.505c0-16.061,13.066-29.127,29.127-29.127h6.948c16.061,0,29.127,13.066,29.127,29.127 v32.601c0,16.061-13.066,29.127-29.127,29.127h-6.948c-16.061,0-29.127-13.066-29.127-29.127V50.505z M71.617,207.9 c-5.904,0-10.689,4.785-10.689,10.689v0.003v86.075c-0.216-0.013-0.431-0.033-0.65-0.033c-9.956,0-18.056-8.032-18.056-17.904 V182.513c0-26.965,22.079-48.902,49.217-48.902h72.284c-12.341,12.659-19.955,29.909-19.955,48.902V286.73 c0,3.46,0.456,6.815,1.303,10.014l-11.971,6.062l-50.795-25.833v-58.38v-0.004C82.306,212.685,77.52,207.9,71.617,207.9z M183.851,476.37c0,7.86-6.393,14.253-14.252,14.253H158.02c-7.858,0-14.252-6.393-14.252-14.252v-117.49 c0-5.904-4.785-10.689-10.689-10.689c-5.903,0-10.689,4.785-10.689,10.689v117.49c0,7.859-6.393,14.252-14.252,14.252H96.557 c-7.858,0-14.252-6.393-14.252-14.252V300.957l45.938,23.364c1.522,0.774,3.184,1.161,4.845,1.161 c1.655,0,3.31-0.384,4.829-1.153l18.111-9.171c7.079,6.717,16.646,10.855,27.171,10.855c0.219,0,0.434-0.019,0.65-0.033V476.37z M306.773,476.371c0,7.859-6.393,14.252-14.252,14.252h-11.58c-7.859,0-14.252-6.393-14.252-14.252v-117.49 c0-5.904-4.786-10.689-10.689-10.689c-5.904,0-10.689,4.785-10.689,10.689v117.49c0,7.859-6.393,14.252-14.252,14.252h-11.579 c-7.859,0-14.252-6.393-14.252-14.252v-175.3l45.934,23.258c1.519,0.768,3.174,1.153,4.829,1.153 c1.662,0,3.323-0.387,4.845-1.161l45.936-23.365V476.371z M317.462,207.9c-5.902,0-10.689,4.785-10.689,10.689v0.003v58.38 l-50.794,25.834l-50.751-25.697v-58.517v-0.003c0-5.904-4.785-10.689-10.689-10.689s-10.689,4.785-10.689,10.689v0.003v86.075 c-0.216-0.013-0.431-0.033-0.65-0.033c-9.956,0-18.056-8.032-18.056-17.904V182.513c0-24.346,18.001-44.588,41.472-48.292 l40.257,66.058c1.94,3.184,5.399,5.126,9.127,5.126s7.187-1.942,9.127-5.126l40.257-66.058 c23.471,3.703,41.472,23.945,41.472,48.292V286.73c0,9.872-8.099,17.904-18.056,17.904c-0.219,0-0.434,0.019-0.65,0.033v-86.075 v-0.003C328.151,212.685,323.365,207.9,317.462,207.9z M429.696,476.371c0,7.859-6.393,14.252-14.252,14.252h-11.58 c-7.859,0-14.252-6.393-14.252-14.252v-117.49c0-5.904-4.786-10.689-10.689-10.689c-5.902,0-10.689,4.785-10.689,10.689v117.49 c0,7.859-6.393,14.252-14.252,14.252h-11.58c-7.859,0-14.252-6.393-14.252-14.252V325.979c0.216,0.013,0.431,0.033,0.65,0.033 c10.525,0,20.092-4.137,27.171-10.855l18.111,9.171c1.519,0.768,3.174,1.153,4.829,1.153c1.662,0,3.323-0.387,4.845-1.161 l45.938-23.365V476.371z M451.724,304.635c-0.219,0-0.434,0.019-0.65,0.033v-86.075v-0.004c0-5.904-4.786-10.689-10.689-10.689 c-5.902,0-10.689,4.785-10.689,10.689v0.003v58.38l-50.794,25.834l-11.972-6.062c0.848-3.198,1.303-6.554,1.303-10.014V182.513 c0-18.993-7.615-36.243-19.956-48.902h72.284c27.139,0,49.217,21.937,49.217,48.902v104.218h0.001 C469.78,296.603,461.681,304.635,451.724,304.635z" />{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>

  );
}


export default function Home() {
  return (
    <MotionRoot>
    <main className="min-h-screen bg-[#fbf8f3] text-[#202223]">
      <section
        id="top"
        className="relative grid min-h-[820px] overflow-hidden pt-16 text-white sm:min-h-[760px]"
      >
        <picture>
        <MotionHeroBackground className="absolute inset-0 bg-[url('../public/img/bannerbg.png')] bg-cover bg-center" />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,18,18,.08)_0%,rgba(15,18,18,.18)_40%,rgba(15,18,18,.34)_84%,#fbf8f3_100%)]" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-28 pt-24 text-center sm:pt-28">
          <MotionHeroItem delay={0.09} className="mb-4">
            <LionMark className="h-36 w-36 text-[#d69c24] drop-shadow-[0_14px_22px_rgba(0,0,0,1)] sm:h-44 sm:w-44" />
          </MotionHeroItem>
          <MotionHeroTitle delay={0.18} className={`whitespace-nowrap text-[clamp(1.7rem,8.3vw,5.7rem)] font-bold ${space_grotesk.className} uppercase leading-none tracking-[0.08em] text-[#dfad41] drop-shadow-[0_8px_16px_rgba(0,0,0,.45)] sm:tracking-[0.18em]`}>
            Pluto Prime
          </MotionHeroTitle>
          <MotionHeroItem delay={0.27} className="mt-4 flex items-center gap-4 text-[#d89f2a]">
            <MotionRule delay={0.42} className="h-px w-16 bg-current" />
            <p className={`text-lg font-black whitespace-nowrap ${gyre_adventor.className} uppercase tracking-[0.32em]`}>
              Since 2000
            </p>
            <MotionRule delay={0.42} className="h-px w-16 bg-current" />
          </MotionHeroItem>

          <div className="mt-10 grid w-full max-w-2xl grid-cols-3 divide-x divide-[#d89f2a]/45">
            {heroItems.map((item) => (
              <MotionServiceItem
                key={item.label}
                delay={item.delay}
                className="hero-service flex min-h-28 flex-col items-center justify-end gap-3 px-2"
              >
                <ServiceIcon name={item.icon} />
                <p className="text-[0.72rem] font-black uppercase tracking-wide">
                  {item.label}
                </p>
              </MotionServiceItem>
            ))}
          </div>

          <MotionHeroItem delay={0.6} className={`mt-6 text-sm font-semibold ${manrope.className} text-[#d89f2a]`}>
            Renovations · Cleaning · Workforce
          </MotionHeroItem>

          <MotionLink
            id="estimate"
            href="#contact"
            delay={0.66}
            className="mt-14 inline-flex min-h-14 w-full max-w-sm items-center justify-center rounded-md bg-[#bd7f09] px-8 text-base font-black text-white shadow-[0_18px_34px_rgba(57,36,3,.38)] transition hover:bg-[#a96f05]"
          >
            Quick Price Estimate
          </MotionLink>
        </div>
      </section>

      <MotionSection id="diensten" className="px-5 pb-20 pt-12 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#bd7f09]">
              Services
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-[0.08em] text-[#202223] sm:text-5xl">
              Our Expertise
            </h2>
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {services.map((service, index) => (
              <MotionArticle
                key={service.title}
                delay={index * 0.1}
                className="group"
              >
                <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_4px_12px_rgba(21,21,21,.26)]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={900}
                    height={760}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[1.18/1] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-5">
                  <p className="text-sm font-bold uppercase text-[#bd7f09]">
                    {service.eyebrow}
                  </p>
                  <h3 className="mt-1 text-2xl font-black leading-tight text-[#1f2021]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-base font-semibold leading-snug text-[#3f4042]">
                    {service.description}
                  </p>
                  <a
                    href={service.href}
                    className="mt-4 inline-flex text-lg font-black text-[#bd7f09] transition hover:text-[#8f5f05]"
                  >
                    View More <CornerRightUp/>
                  </a>
                </div>
              </MotionArticle>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="over-ons" className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.05fr_.95fr] md:items-center">
          <MotionBlock>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#bd7f09]">
              About Us
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Reliable delivery for real estate in the Netherlands.
            </h2>
            <p className="mt-6 text-lg font-semibold leading-8 text-[#505155]">
              Since 2000, Pluto Prime has worked on renovations for homes,
              apartments, and bathrooms. Our experience comes from the
              Netherlands, Belgium, France, Germany, and Slovakia, with the
              same focus: clear communication, quality, and long-term
              relationships.
            </p>
          </MotionBlock>
          <div className="grid grid-cols-2 gap-4">
            {["20+ years of experience", "Turnkey bathrooms", "Flexible teams", "Clear planning"].map(
              (item, index) => (
                <MotionFeatureCard
                  key={item}
                  delay={index * 0.08}
                  className="rounded-lg border border-[#ead8b7] bg-[#fbf8f3] p-5"
                >
                  <p className="text-xl font-black text-[#bd7f09]">✓</p>
                  <p className="mt-3 text-lg font-black leading-tight">
                    {item}
                  </p>
                </MotionFeatureCard>
              ),
            )}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        id="contact"
        className="bg-[#171b1c] px-5 py-20 text-white"
      >
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#d69c24]">
              Contact
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black leading-tight">
              Send photos and a short description. We will help you think
              through the best approach.
            </h2>
          </div>
          <MotionLink
            href="mailto:info@plutoprime.nl?subject=Quick%20price%20estimate"
            className="inline-flex min-h-14 items-center justify-center rounded-md bg-[#bd7f09] px-8 text-base font-black text-white shadow-[0_18px_34px_rgba(0,0,0,.28)] transition hover:bg-[#a96f05]"
          >
            Request a Price Estimate
          </MotionLink>
        </div>
      </MotionSection>

    </main>
    </MotionRoot>
  );
}
