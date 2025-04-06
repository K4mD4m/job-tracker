import { Github, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-base">
        <p className="text-center md:text-left font-medium">
          © 2025 JobTracker. Built by K4mD4m.
        </p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <Link
            href="https://github.com/K4mD4m"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:text-blue-400 hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href="mailto:KamyszekDamian@outlook.com"
            className="transition-all duration-300 hover:text-blue-400 hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
