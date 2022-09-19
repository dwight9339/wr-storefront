import Image from "next/image";
import {
  sidebarContainer,
  collectionLinkContainer
} from "../styles/Sidebar.module.scss";

interface Collection {
  title: string;
  id: string;
}

type SidebarProps = {
  collections: Collection[];
}

const Sidebar = ({ collections }: SidebarProps) => {
  return (
      <div className={sidebarContainer}>
        <Image
          src="/images/wr_logo_v1.svg"
          width={100}
          height={100}
        />
        <div className={collectionLinkContainer}>
          {collections.map((collection, i) => 
            <a 
              key={i}
              href={`/collection/${collection.id}`}  
            >
              {collection.title}
            </a>
          )}
        </div>
      </div>
  )
}

export default Sidebar;