interface AboutProps {
  fields: {
    description: {
      content: Document;
    };
    image: {
      fields: {
        title: string;
        file: {
          url: string;
        };
      };
    };
  };
}
