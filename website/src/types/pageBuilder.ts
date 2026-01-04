// page-level fields
type PageContent = {
  tile: string;
  slug: string;
  meta_title?: string | null | undefined;
  meta_keywords?: string[] | null | undefined;
  meta_description?: string | null | undefined;
  meta_image?: Asset;
  sections: any[];
  top_navigation: any;
  bottom_navigation: any;
};

type CommonSection = {
  type: string;
  data: {
    type: string;
    title?: any;
    subtitle?: any;
    blurb?: any;
    contents?: any;
    cover?: any;
    buttons?: any;
    list_type?: any;
    files?: any;
    items?: any;
    collections?: any;
    collection_items_limit?: any;
    collection_items_order?: any;
    collection_filter?: any;
    doctors?: any[];
    custom?: any;
    url?: any;
  };
  dataDetail?: any;
};

// section-level fields
type SectionMap = {
  [key: string]: any;
};

// input-level fields
type Asset =
  | string
  | {
      id: string;
    }
  | {
      directus_files_id: {
        id: string;
      };
    };

export type { Asset, PageContent, SectionMap, CommonSection };
