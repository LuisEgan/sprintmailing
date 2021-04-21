import { HeaderDescription, HeaderTitle, HeaderWrapper } from "./Header.style";

interface HeaderProps {
  title: string;
  description: string;
}
const Header = (props: HeaderProps) => {
  const { title, description } = props;

  return (
    <HeaderWrapper className={"pb-5"}>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderDescription>{description}</HeaderDescription>
    </HeaderWrapper>
  );
};
export default Header;
