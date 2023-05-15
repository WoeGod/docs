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
  color: rgb(0,0,0);
  font-size: 16px;
  margin: 0;
  padding: 0 20px;
`
const LogoTitle = styled(TopTitle)`
  border-right: 2px solid #000000;
`
const StyledLink = styled(Link)`
  color: #000000;
  text-decoration: unset;
  &: hover {
    text-decoration: underline;
  }
`


const Logo = () => {
  return (
    <div className="flex align-center">
      <Image width={30} src={require('../../public/logo.png')} alt="logo" />
      <LogoTitle><StyledLink href={'/'}>QiXin</StyledLink></LogoTitle>
    </div>
  );
};

const Menu = () => {
  const menuList = [
    {
      title: 'Document',
      href: '/docs'
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