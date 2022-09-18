import styled from "@emotion/styled";

type GalleryProps = {

}

const GalleryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[3]}
`;

const Gallery = ({}: GalleryProps) => {
  return (
    <GalleryContainer>

    </GalleryContainer>
  )
}

export default Gallery;