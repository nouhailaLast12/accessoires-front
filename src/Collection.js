// src/pages/Collection.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaChevronDown, FaChevronRight } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const CollectionContainer = styled.div`
  padding: 120px 0 60px;
  min-height: 100vh;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
    url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  color: #333;
`;

const CollectionHero = styled.section`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.8s ease-out;
  text-align: center;

  h1 {
    font-size: 3.5rem;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 3px;
    font-weight: 700;
    position: relative;
    color: #333;
    margin-bottom: 20px;
    
    &::after {
      content: '';
      display: block;
      width: 100px;
      height: 4px;
      background: #4a90e2;
      margin: 20px auto 0;
    }
  }

  p {
    max-width: 700px;
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const CollectionContent = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const CollectionFilters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;

  input {
    width: 100%;
    padding: 14px 20px 14px 50px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 4px 20px rgba(74, 144, 226, 0.2);
    }
  }

  svg {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
  }
`;

const FilterGroup = styled.div`
  position: relative;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);

  &:hover {
    background: #3a7bc8;
    transform: translateY(-2px);
  }
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 250px;
  margin-top: 10px;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const FilterOption = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #4a90e2;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
`;

const CollectionCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);

    img {
      transform: scale(1.05);
    }
  }
`;

const CollectionImage = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5));
    z-index: 1;
  }
`;

const CollectionInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 25px;
  z-index: 2;
  color: white;
`;

const CollectionTitle = styled.h3`
  font-size: 1.8rem;
  margin: 0 0 10px;
  text-shadow: 0 2px 5px rgba(0,0,0,0.3);
`;

const CollectionCount = styled.p`
  margin: 0;
  font-size: 1rem;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
`;

const ViewCollectionButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  border: none;
  border-radius: 30px;
  padding: 8px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #4a90e2;
    color: white;
    transform: translateY(-2px);
  }
`;

// Sample collection data
const collections = [
  {
    id: 1,
    title: 'Summer Essentials',
    itemCount: 42,
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    title: 'Formal Attire',
    itemCount: 36,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    title: 'Streetwear',
    itemCount: 58,
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 4,
    title: 'Accessories',
    itemCount: 87,
    image: 'https://images.unsplash.com/photo-1590649880761-e9d7d92a9b9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 5,
    title: 'Winter Collection',
    itemCount: 29,
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 6,
    title: 'Limited Edition',
    itemCount: 15,
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

const Collection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Collections');

  const filteredCollections = collections.filter(collection =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterOptions = [
    'All Collections',
    'Seasonal',
    'New Arrivals',
    'Best Sellers',
    'Limited Edition'
  ];

  return (
    <CollectionContainer>
      <CollectionHero>
        <h1>Our Collections</h1>
        <p>Discover curated selections of our finest products, handpicked to match your style and needs.</p>
      </CollectionHero>
      
      <CollectionContent>
        <CollectionFilters>
          <SearchBar>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search collections..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          
          <FilterGroup>
            <FilterButton onClick={() => setFilterOpen(!filterOpen)}>
              {activeFilter}
              {filterOpen ? <FaChevronDown /> : <FaChevronRight />}
            </FilterButton>
            
            <FilterDropdown $isOpen={filterOpen}>
              {filterOptions.map(option => (
                <FilterOption 
                  key={option}
                  onClick={() => {
                    setActiveFilter(option);
                    setFilterOpen(false);
                  }}
                >
                  {option}
                </FilterOption>
              ))}
            </FilterDropdown>
          </FilterGroup>
        </CollectionFilters>
        
        <CollectionsGrid>
          {filteredCollections.map((collection, index) => (
            <CollectionCard key={collection.id} $delay={`${index * 0.1}s`}>
              <CollectionImage>
                <img src={collection.image} alt={collection.title} />
              </CollectionImage>
              
              <CollectionInfo>
                <CollectionTitle>{collection.title}</CollectionTitle>
                <CollectionCount>{collection.itemCount} items</CollectionCount>
              </CollectionInfo>
              
              <ViewCollectionButton>
                View Collection
              </ViewCollectionButton>
            </CollectionCard>
          ))}
        </CollectionsGrid>
      </CollectionContent>
    </CollectionContainer>
  );
};

export default Collection;