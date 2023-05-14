import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import Image from 'next/image';
import { styled } from 'styled-components';
import Link from 'next/link';

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
  font-size: 26px;
  margin: 0;
  padding: 0 20px;
`
const LogoTitle = styled(TopTitle)`
  border-right: 2px solid #000000;
`
const StyledLink = styled(Link)`
  color: #000000;
  text-decoration: unset;
`


const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

const Logo = () => {
  return (
    <div className="flex align-center">
      <Image width={30} src={require('../../public/logo.png')} alt="logo" />
      <LogoTitle>QiXin</LogoTitle>
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
      
      <SearchBox
        styles={searchBoxStyles}
        placeholder="Search"
        onEscape={ev => {
          console.log('Custom onEscape Called');
        }}
        onClear={ev => {
          console.log('Custom onClear Called');
        }}
        onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
        onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
      />
    </HeaderWrapper>
  )
}