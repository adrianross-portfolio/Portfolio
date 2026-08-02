import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SideNav from "@/components/SideNav";
import Footer from "@/components/footer";
import BulbToggle from "@/components/BulbToggle";

export default function Home() {
  return (
    <main
      className="
        min-h-screen
        flex flex-col
        lg:flex-row
        text-white
      "
    >
      {/* LEFT / TOP */}
      <aside
        className="
          w-full
          lg:w-[35%]

          lg:h-screen
          lg:sticky lg:top-0

          border-b lg:border-b-0
          lg:border-r
          border-[color:var(--border)]

          flex flex-col
          p-6 md:p-8
        "
      >
        {/* NAV */}
        <div className="flex justify-center">
          <div className="rounded px-4 py-2">
            <SideNav />
          </div>
        </div>

        {/* HERO */}
        <div
          className="
            flex flex-col
            items-center
            justify-center
            gap-8

            py-12
            lg:flex-1
            lg:py-0
          "
        >
          <Hero />

          {/* Mobile */}
          <div className="fixed top-4 right-4 z-50 lg:hidden">
            <BulbToggle />
          </div>

          {/* Desktop */}
          <div className="hidden lg:block rounded px-4 py-3">
            <BulbToggle />
          </div>
        </div>
      </aside>

      {/* RIGHT */}
      <section
        className="
          w-full
          lg:w-[65%]

          min-h-screen

          px-6
          md:px-8
          py-12

          space-y-24
          lg:space-y-40

          pb-24
        "
      >
        <About />
        <Skills />
        <Projects />
        <Contact />
      </section>
    </main>
  );
}
