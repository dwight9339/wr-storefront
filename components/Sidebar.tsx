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
        <div className={styles.sidebarMain}>
          <div className={styles.cartContainer}>
            <Image
              src="/images/icons/cart.svg"
              width={50}
              height={50}
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
        <div className={styles.cartIcon}>
          <CartIcon />
        </div>
      </div>
  )
}

export default Sidebar;