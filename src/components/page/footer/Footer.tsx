import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";

const Footer = () => {
    return ( <div className="flex flex-col gap-2 items-center justify-center h-full text-muted-foreground">
        <p>Inspired by start.spring.io.</p>
        <div className="flex gap-2">
            <Button variant={"ghost"} className="p-0 h-5" aria-label="portfolio page"> <ExternalLink className="size-5" /> </Button>
            <Button variant={"ghost"} className="p-0 h-5" aria-label="LinkedIn profile"> <FaLinkedin className="size-5 text-[#0a66c2] hover:text-[#4284c7] transition-all" /> </Button>
            <Button variant={"ghost"} className="p-0 h-5" aria-label="Github profile"> <FaGithub className="size-5" /> </Button>
        </div>
    </div> );
}
 
export default Footer;