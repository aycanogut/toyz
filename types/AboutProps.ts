interface AboutProps {
  description: {
    content: {
      content: {
        value: string;
      }[];
    }[];
  };
  image: {
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  };
}
