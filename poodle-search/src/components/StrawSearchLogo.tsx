import React from 'react';
import logo from '../assets/strawsearch.png'; // Đường dẫn tới file logo bạn đã lưu
import styled from 'styled-components';

const Logo = styled.img`
  margin: 0 auto; // Căn giữa theo trục ngang
  display: block; // Đảm bảo logo hiển thị dưới dạng block
  height: 272px; // Đặt chiều cao cố định
  width: 300px; // Đặt chiều rộng cố định
`;

const StrawSearchLogo: React.FC = () => {
    return <Logo src={logo} alt="StrawSearch" />;
};

export default StrawSearchLogo;
