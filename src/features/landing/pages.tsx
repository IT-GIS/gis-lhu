import { LandingHtmlPage } from "./landing-html-page";
import { landingPages } from "./static-pages";

export function HomeLandingPage() {
  return <LandingHtmlPage page={landingPages.home} />;
}

export function ProfileLandingPage() {
  return <LandingHtmlPage page={landingPages.profile} />;
}

export function ServiceLandingPage() {
  return <LandingHtmlPage page={landingPages.service} />;
}

export function ContactLandingPage() {
  return <LandingHtmlPage page={landingPages.contact} />;
}
