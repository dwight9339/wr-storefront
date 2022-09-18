import Image from "next/image";
import styled from "@emotion/styled";

const SidebarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.tan[3]};
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Sidebar = () => {
  return (
      <SidebarContainer>
        <Image
          src="/images/wr_logo_v1.svg"
          width={100}
          height={100}
        />
      </SidebarContainer>
  )
}

export default Sidebar;