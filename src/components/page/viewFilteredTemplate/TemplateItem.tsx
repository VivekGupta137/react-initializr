import "server-only";
import CopyButton from "../CopyButton";
import Link from "next/link";
import prisma from "../../../../prisma";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PiStarFill } from "react-icons/pi";
import { nFormatter } from "@/lib/filterUtils";
import { FaCodeFork } from "react-icons/fa6";
import { FaBinoculars } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { cn } from "@/lib/utils";
import TemplateItemMeta from "./TemplateItemMeta";
type TemplateItemProps = {
  name: string;
  description?: string | null;
  url: string;
  metadata?: Awaited<ReturnType<typeof prisma.templateMetadata.findFirst>>;
};

const TemplateItem = ({
  name,
  description,
  url,
  metadata,
}: TemplateItemProps) => {
  const iconMap: { [key: string]: string } = {
    JavaScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    TypeScript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    Python:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "C++":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    Ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
    Swift:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    Kotlin:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    Scala:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg",
    Perl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg",
    Haskell:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg",
    Lua: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
    Shell:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    R: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
    CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    Vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    React:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    Angular:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    Svelte:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
    Ember:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ember/ember-original.svg",
    Backbone:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/backbonejs/backbonejs-original.svg",
    Node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    Express:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    Django:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg",
    Flask:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    Spring:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    "Ruby on Rails":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg",
    Laravel:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain-wordmark.svg",
    Phoenix:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/phoenix/phoenix-original-wordmark.svg",
    Android:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original-wordmark.svg",
    iOS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
    Flutter:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    "React Native":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    Xamarin:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original-wordmark.svg",
    Electron:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
    Unity:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    "Unreal Engine":
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unreal/unreal-original.svg",
    MongoDB:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg",
  };

  return (
    <div className="group sm:border-b hover:bg-muted duration-200 mt-2">
      <div className="flex flex-col sm:flex-row ">
        <div className="py-2 flex flex-col gap-2 px-3 grow shrink">
          <div className="flex gap-2 items-center">
            <div className="rounded-sm overflow-hidden">
              <Image
                src={metadata?.orgAvatarUrl ?? ""}
                alt={metadata?.orgName ?? ""}
                width={20}
                height={20}
              />
            </div>
            <h2 className="font-bold text-lg text-blue-500 hover:underline">
              <Link href={metadata?.htmlUrl ?? "#"} target="_blank">
                {name}
              </Link>
            </h2>
            <div>
              <Link href={metadata?.htmlUrl ?? "#"} target="_blank">
                <ExternalLink className="size-5" />
              </Link>
            </div>
          </div>
          <p className="text-muted-foreground">{description}</p>
          <div className="block sm:hidden">
            <TemplateItemMeta metadata={metadata} />
          </div>
        </div>
        <div className="rounded-md rounded-l-none sm:pr-2 sm:self-start sm:pt-2 shrink-0 basis-30 order">
          <CopyButton
            variant={"outline"}
            copyText={`git clone ${metadata?.cloneUrl ?? ""}`}
            className="w-full"
          >
            Clone
          </CopyButton>
        </div>
      </div>
      <div className="hidden sm:block mb-2">
        <TemplateItemMeta metadata={metadata} />
      </div>
    </div>
  );
};

export default TemplateItem;
