interface RepositoryInterface<T> {
  create(item: T, callback: (id?: number) => void): void;
  readAll(callback: (items: T[]) => void): void;
  read(id: number, callback: (item?: T) => void): void;
  update(id: number, item: T, callback: (notFound: boolean) => void): void;
  delete(id: number, callback: (notFound: boolean) => void): void;
};

export default RepositoryInterface;