import {Manrope, Orbitron, Space_Grotesk} from "next/font/google"
import localFont from "next/font/local"
export const orbitron = Orbitron({subsets:["latin"]})

export const gyre_adventor = localFont({
    src: [
        {path: "public/fonts/gyre_adventor_bold.otf"},
    ],
    variable: "--font-aventor",
    display: "swap"
})

export const manrope = Manrope({subsets: ["latin"]})

export const space_grotesk = Space_Grotesk({subsets:["latin"]})