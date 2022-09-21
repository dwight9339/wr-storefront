import Image from "next/image";
import styles from "../styles/Sidebar.module.scss";
import { useState, useEffect } from "react";
import { Collection } from "./types";

type SidebarProps = {
  collections: Collection[];
}

const Sidebar = ({ collections }: SidebarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuOpen = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    console.log(`Menu Open: ${menuOpen}`);
  }, [menuOpen]);

  return (
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarMain}>
          <div className={styles.cartContainer}>
            <Image
              src="/images/icons/cart.svg"
              width={50}
              height={50}
            />
          </div>
          <div className={styles.logoContainer}>
            <Image
              src="/images/wr_logo_v1.svg"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.hamburgerContainer}>
            <Image
              src={"/images/icons/basic_hamburger.svg"}
              width={30}
              height={30}
              onClick={toggleMenuOpen}
            />
          </div>
        </div>
        <div className={menuOpen ? styles.collectionLinkContainer : styles.disappearLinks}>
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