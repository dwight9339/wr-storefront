import Image from "next/image";
import styled from "@emotion/styled";

const SidebarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.tan[3]};
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const CollectionButton = styled.a`
  color: ${({ theme }) => theme.colors.gray[3]}
`;

interface Collection {
  title: string;
  id: string;
}

type SidebarProps = {
  collections: Collection[];
}

const Sidebar = ({ collections }: SidebarProps) => {
  return (
      <SidebarContainer>
        <Image
          src="/images/wr_logo_v1.svg"
          width={100}
          height={100}
        />
        <div
          
        >
          {collections.map((collection, i) => 
          <CollectionButton 
            key={i}
            href={`/collection/${collection.id}`}  
          >
            {collection.title}
          </CollectionButton>)}
        </div>
      </SidebarContainer>
  )
}

export default Sidebar;