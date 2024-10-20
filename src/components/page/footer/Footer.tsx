import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { github, linkedin, portfolio } from "@/constants/footerLinks";

const Footer = () => {
    return ( <div className="flex flex-col gap-2 items-center justify-center h-full text-muted-foreground">
        <p>Inspired by start.spring.io.</p>
        <div className="flex gap-2">
            <Link href={portfolio}>
                <Button variant={"ghost"} className="p-0 h-5" aria-label="portfolio page"> <ExternalLink className="size-5" /> 
                <div className="sr-only">About me</div>
                </Button>
            </Link>
            <Link href={linkedin}>
                <Button variant={"ghost"} className="p-0 h-5" aria-label="portfolio page"> <FaLinkedin className="size-5 text-[#4284c7] hover:text-[#0a66c2] transition-all" /> 
                <div className="sr-only">LinkedIn profile</div>
                </Button>
            </Link>
            <Link href={github}>
                <Button variant={"ghost"} className="p-0 h-5" aria-label="portfolio page"> <FaGithub className="size-5" /> 
                <div className="sr-only">Github profile</div>
                </Button>
            </Link>
            
        </div>
    </div> );
}
 
export default Footer;