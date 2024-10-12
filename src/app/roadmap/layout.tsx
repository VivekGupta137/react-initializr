export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
      <div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black dark:prose-headings:text-white prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-h4:text-white dark:prose-h5:text-white dark:prose-h6:text-white prose-ul:my-4 prose-ul:ml-5 prose-ul:list-disc prose-ol:my-4 prose-ol:ml-5 prose-ol:list-decimal prose-li:mb-2 prose-li:pl-2 dark:prose-li:text-white dark:prose-ul:text-white dark:prose-ol:text-white">
        {children}
      </div>
    )
  }
  