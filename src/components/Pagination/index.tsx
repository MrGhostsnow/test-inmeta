import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "#007bff" : "#ffffff")};
  color: ${({ active }) => (active ? "#ffffff" : "#007bff")};
  cursor: pointer;
`;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <PaginationContainer>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <PageButton
            key={page}
            onClick={() => onPageChange(page)}
            active={page === currentPage}
          >
            {page}
          </PageButton>
        )
      )}
    </PaginationContainer>
  );
};

export default Pagination;
