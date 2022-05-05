import type { LinksFunction } from "@remix-run/server-runtime";
import RegisterSection from "~/sections/AuthSection/RegisterSection";
import AnimationRegister, {
  links as AnimationRegisterStyles,
} from "~/sections/AuthSection/AnimationRegister";

export const links: LinksFunction = () => {
  return AnimationRegisterStyles();
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen w-screen flex-row-reverse items-stretch">
      <RegisterSection />
      <div className="hidden w-1/2 lg:block">
        <div className="fixed top-0 left-0 h-screen w-5/6 overflow-hidden">
          <AnimationRegister />
        </div>
      </div>
    </div>
  );
}
