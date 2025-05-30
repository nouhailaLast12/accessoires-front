import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "./context/CartContext"; // Chemin corrigé

const ShopContainer = styled.div`
  text-align: center;
  padding: 30px;
  background-color: #fafafa;
  min-height: 80vh;
`;

const SearchContainer = styled.div`
  margin: 20px auto;
  max-width: 600px;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  padding: 12px 20px;
  width: 100%;
  border: 2px solid #e8d9c5;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ffd54f;
    box-shadow: 0 0 10px rgba(255, 213, 79, 0.3);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  width: 90%;
  margin: 2rem auto;
  padding: 20px 0;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  margin: 1rem 0;
`;

const CurrentPrice = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #27ae60;
`;

const OldPrice = styled.span`
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 0.5rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #ffd54f;
  color: #3e2723;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: auto;
`;

const BrandTitle = styled.h1`
  margin-bottom: 2rem;
  color: #3e2723;
  font-size: 2.5rem;
`;

const SearchResultsHeader = styled.h2`
  margin-bottom: 2rem;
  color: #3e2723;
`;

const NoProductsMessage = styled.div`
  padding: 50px;
  font-size: 18px;
  color: #5d4037;
  grid-column: 1 / -1;
  text-align: center;
`;

const brandsData = {
  chanel: [
    {
      id: 1,
      title: "Sac à main Chanel",
      price: 1200,
      description: "Sac à main de luxe de la marque Chanel.",
      category: "accessoires",
      image: "/images/chanel1.jpeg",
    },
    {
      id: 2,
      title: "Parfum Chanel",
      price: 150,
      description: "Parfum classique de Chanel.",
      category: "parfumerie",
      image: "/images/chanel2.jpeg",
    },
  ],
  gucci: [
    {
      id: 3,
      title: "Lunettes de soleil Gucci",
      price: 350,
      description: "Lunettes de soleil élégantes de Gucci.",
      category: "accessoires",
      image: "/images/gucci1.jpeg",
    },
    {
      id: 4,
      title: "Ceinture Gucci",
      price: 450,
      description: "Ceinture iconique de la marque Gucci.",
      category: "accessoires",
      image: "/images/gucci2.jpeg",
    },
  ],
  dior: [
    {
      id: 5,
      title: "Robe Dior",
      price: 2500,
      description: "Robe élégante de la maison Dior.",
      category: "vêtements",
      image: "/images/dior8.jpg",
    },
    {
      id: 6,
      title: "Rouge à lèvres Dior - Teinte Rose Poudré",
      price: 80,
      description: "Rouge à lèvres haute qualité de Dior, teinte Rose Poudré.",
      category: "maquillage",
      image: "/images/dior7.jpg",
    },
    {
      id: 7,
      title: "Rouge à lèvres Dior - Teinte Rouge Intense",
      price: 90,
      description: "Rouge à lèvres haute qualité de Dior, teinte Rouge Intense.",
      category: "maquillage",
      image: "/images/dior6.jpg",
    },
    {
      id: 8,
      title: "Rouge à lèvres Dior - Teinte Nude Éclat",
      price: 150,
      description: "Rouge à lèvres haute qualité de Dior, teinte Nude Éclat.",
      category: "maquillage",
      image: "/images/dior5.jpg",
    },
    {
      id: 9,
      title: "Rouge à lèvres Dior - Teinte Coral Glow",
      price: 2050,
      description: "Rouge à lèvres haute qualité de Dior, teinte Coral Glow.",
      category: "maquillage",
      image: "/images/dior4.jpg",
    },
    {
      id: 10,
      title: "Rouge à lèvres Dior - Teinte Velvet Red",
      price: 450,
      description: "Rouge à lèvres haute qualité de Dior, teinte Velvet Red.",
      category: "maquillage",
      image: "/images/dior13.jpg",
    },
    {
      id: 11,
      title: "Rouge à lèvres Dior - Teinte Burgundy Passion",
      price: 350,
      description: "Rouge à lèvres haute qualité de Dior, teinte Burgundy Passion.",
      category: "maquillage",
      image: "/images/dior2.jpeg",
    },
    {
      id: 12,
      title: "Rouge à lèvres Dior - Teinte Pink Dream",
      price: 950,
      description: "Rouge à lèvres haute qualité de Dior, teinte Pink Dream.",
      category: "maquillage",
      image: "/images/dior1.jpeg",
    },
    {
      id: 13,
      title: "Rouge à lèvres Dior - Teinte Pure Red",
      price: 550,
      description: "Rouge à lèvres haute qualité de Dior, teinte Pure Red.",
      category: "maquillage",
      image: "/images/dior9.jpg",
    },
    {
      id: 14,
      title: "Rouge à lèvres Dior - Teinte Vintage Rose",
      price: 110,
      description: "Rouge à lèvres haute qualité de Dior, teinte Vintage Rose.",
      category: "maquillage",
      image: "/images/dior10.jpg",
    },
    {
      id: 15,
      title: "Rouge à lèvres Dior - Teinte Classic Plum",
      price: 990,
      description: "Rouge à lèvres haute qualité de Dior, teinte Classic Plum.",
      category: "maquillage",
      image: "/images/dior11.jpg",
    },
    {
      id: 16,
      title: "Rouge à lèvres Dior - Teinte Dark Rose",
      price: 1230,
      description: "Rouge à lèvres haute qualité de Dior, teinte Dark Rose.",
      category: "maquillage",
      image: "/images/dior12.jpg",
    },
  ],
};


const Brandpage = () => {
  const { brandName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const urlSearchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchBrandData = () => {
      setLoading(true);
      setTimeout(() => {
        const brandKey = brandName.toLowerCase();
        
        if (brandsData[brandKey]) {
          const brandProducts = brandsData[brandKey];
          setProducts(brandProducts);
          
          const filtered = brandProducts.filter(product =>
            product.title.toLowerCase().includes(urlSearchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(urlSearchQuery.toLowerCase())
          );
          
          setFilteredProducts(filtered);
        }
        setLoading(false);
      }, 800);
    };

    fetchBrandData();
  }, [brandName, urlSearchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value.trim();
    if (searchValue) {
      navigate(`/brand/${brandName}?search=${encodeURIComponent(searchValue)}`);
    } else {
      navigate(`/brand/${brandName}`);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    alert(`${product.title} ajouté au panier`);
  };

  if (loading) {
    return <ShopContainer>Chargement...</ShopContainer>;
  }

  return (
    <ShopContainer>
      <BrandTitle>
        {brandName.charAt(0).toUpperCase() + brandName.slice(1)}
      </BrandTitle>

      <form onSubmit={handleSearch}>
        <SearchContainer>
          <SearchInput
            type="text"
            name="search"
            placeholder="Rechercher dans cette marque..."
            defaultValue={urlSearchQuery}
          />
        </SearchContainer>
      </form>

      {urlSearchQuery && (
        <SearchResultsHeader>
          Résultats pour "{urlSearchQuery}"
        </SearchResultsHeader>
      )}

      <ProductGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage 
                src={product.image} 
                alt={product.title}
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                  e.target.onerror = null;
                }}
              />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDescription>{product.description}</ProductDescription>
                <PriceContainer>
                  <CurrentPrice>{product.price} €</CurrentPrice>
                  <OldPrice>{Math.round(product.price * 1.2)} €</OldPrice>
                </PriceContainer>
                <AddToCartButton onClick={() => handleAddToCart(product)}>
                  Ajouter au panier
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))
        ) : (
          <NoProductsMessage>
            Aucun produit ne correspond à votre recherche.
          </NoProductsMessage>
        )}
      </ProductGrid>
    </ShopContainer>
  );
};

export default Brandpage;