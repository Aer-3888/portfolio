import { memo } from "react";
import { useTranslation } from "react-i18next";
import { EMAIL, SOCIALS } from "../../../config/siteData";

function Footer() {
  const { t } = useTranslation("home");

  return (
    <footer className="border-t border-rule bg-ground px-6 py-7 text-sm text-ash md:px-10">
      <div className="mx-auto flex max-w-[100rem] flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <span>Théo Phan · {t("footer.location")}</span>
        <nav aria-label="Social links" className="flex flex-wrap gap-x-7 gap-y-3">
          <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-accent-deep">
            Email
          </a>
          {SOCIALS.filter((social) => social.label !== "Instagram").map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent-deep"
            >
              {social.label}
            </a>
          ))}
          <a href="#home" className="transition-colors hover:text-accent-deep">
            {t("footer.backToTop")}
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default memo(Footer);
