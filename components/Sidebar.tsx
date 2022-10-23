import Image from "next/image";
import styles from "../styles/Sidebar.module.scss";
import { useState, useEffect } from "react";
import type { ProductCollection as Collection } from "@medusajs/medusa"
import { useCatalog } from "../providers/CatalogProvider";
import CartIcon from "./CartIcon";

type SidebarProps = {
  collections: Collection[];
}

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { collections, setSelectedCollection, resetCollection } = useCatalog();

  const toggleMenuOpen = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    console.log(`Menu Open: ${menuOpen}`);
  }, [menuOpen]);

  return (
      <div className={styles.sidebarContainer}>
        <div className={styles.header}>
          <div
            className={styles.hamburgerContainer}
            onClick={toggleMenuOpen}
          >
            <Image
              src="/images/icons/basic_hamburger.svg"
              width={40}
              height={40}
            />
          </div>
          <div 
            className={styles.logoContainer}
            onClick={resetCollection}
          >
            <Image
              src="/images/wr_logo_v1.svg"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.cartIconHorizontal}>
            <CartIcon />
          </div>
        </div>
        <div className={menuOpen ? styles.collectionLinkContainer : styles.disappearLinks}>
          <div 
            className={styles.collectionFilterButton}
            onClick={resetCollection}
          >
            All            
          </div>
          {collections && collections.map((collection, i) => 
            <div
              className={styles.collectionFilterButton}
              key={i}
              onClick={() => setSelectedCollection(collection.id)}
            >
              {collection.title}
            </div>
          )}
        </div>
        <div className={styles.cartIconVertical}>
          <CartIcon />
        </div>
        
      </div>
  )
}

export default Sidebar;