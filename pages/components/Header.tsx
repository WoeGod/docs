import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import SearchBox from './SearchBox';

const HeaderWrapper = styled.div`
  background-color: #F5F5F5;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
`
const LeftWrapper = styled.div`
  display: flex;
`

const TopTitle = styled.h3`
  font-size: 16px;
  margin: 0;
  padding: 0 20px;
`
const LogoTitle = styled(Link)`
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  padding: 0 20px;
  border-right: 2px solid #000000;
`
const StyledLink = styled(Link)`
  &: hover {
    text-decoration: underline;
  }
`


const Logo = () => {
  return (
    <div className="flex align-center">
      <Image width={30} height={30} src="/logo.png" alt="logo" />
      <LogoTitle href="/">QiXin</LogoTitle>
    </div>
  );
};

const Menu = () => {
  const menuList = [
    {
      title: 'Document',
      href: '/'
    },
    {
      title: 'Train',
      href: ''
    },
    {
      title: 'Q&A',
      href: ''
    }
  ];
  return (
    <div className="flex align-center">
      {
        menuList.map(menuItem => (
          <TopTitle key={menuItem.title}>
            <StyledLink href={menuItem.href}>{menuItem.title}</StyledLink>
          </TopTitle>
        ))
      }
    </div>
  )
};

export default function Header() {
  return (
    <HeaderWrapper>
      <LeftWrapper>
        <Logo />
        <Menu />
      </LeftWrapper>
      
      <SearchBox />
    </HeaderWrapper>
  )
}