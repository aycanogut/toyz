interface ContentProps {
  fields: {
    id: number;
    title: string;
    content: Document;
    description: string;
    image: {
      fields: {
        title: string;
        file: {
          url: string;
        };
      };
    };
    details: ContentLabelsProps[];
    slug: string;
  };
}
