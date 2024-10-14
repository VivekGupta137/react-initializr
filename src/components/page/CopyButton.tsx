"use client"
import { useState, MouseEvent } from "react";
import { Button, ButtonProps } from "../ui/button";
import { FaClone } from "react-icons/fa6";
import { cn } from "@/lib/utils";


type CopyButtonProps = {
    copyText: string;
} & ButtonProps;

const CopyButton = (props: CopyButtonProps) => {
    const {variant, onClick, children, copyText} = props;
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
        navigator.clipboard.writeText(copyText);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
        onClick?.(e)
    }

    return ( <Button variant={variant} onClick={handleCopy} disabled={copied} className={cn(copied ? "disabled:opacity-100": "")}>
        { copied ? "Copied 🎉" : <><FaClone className="mr-2" />{children}</> }
    </Button> );
}
 
export default CopyButton;