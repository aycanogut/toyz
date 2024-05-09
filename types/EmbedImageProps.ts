interface EmbedImageProps {
  data: {
    target?: {
      fields?: {
        file?: {
          url?: string;
        };
        title?: string;
        description?: string;
      };
    };
  };
}
