import { IconAnchor, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";
import { footerLinks } from "../LandingPage/DATA";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    return location.pathname != "/signup" && location.pathname != "/login" ? (
        <div className="pt-20 pb-5 flex flex-col sm:flex-row gap-10 sm:gap-5 justify-around bg-mine-shaft-950 font-['poppins'] px-4 sm:px-6">
            <div className="w-full sm:w-1/4 flex flex-col gap-4">
                <div className="flex gap-1 items-center text-bright-sun-400">
                    <IconAnchor className="h-6 w-6" stroke={2.5} />
                    <div className="text-xl font-semibold">SeeKJoB</div>
                </div>
                <div className="text-sm text-mine-shaft-300">Job portal with user profiles, skill updates, certification Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full  [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700">
                    <div><IconBrandFacebook /></div>
                    <div><IconBrandInstagram /></div>
                    <div><IconBrandLinkedin /></div>
                </div>
            </div>
            {
                footerLinks.map((item, index) => (
                    <div key={index} className="w-full sm:w-auto">
                        <div className="text-lg font-semibold mb-4 text-bright-sun-400">{item.title}</div>
                        {
                            item.links.map((link, index) => (
                                <div key={index} className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out">
                                    {link}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    ) : <></>
}
export default Footer;