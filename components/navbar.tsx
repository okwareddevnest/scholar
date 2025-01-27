'use client'; // Add this directive to make it a client component
import React from 'react';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div<{ active?: boolean }>`
  margin-right: 20px;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  color: ${props => (props.active ? '#1a73e8' : '#555')};
  cursor: pointer;

  &:hover {
    color: #1a73e8;
  }
`;

const Navbar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <NavbarWrapper className={className}>
      <NavItem active>Dashboard</NavItem>
      <NavItem>Assignments</NavItem>
      <NavItem>Messages</NavItem>
      {/* Add icons and other elements as needed */}
    </NavbarWrapper>
  );
};

export default Navbar;
