type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => JSX.Element;
};

export default function List<T>(props: ListProps<T>) {
  return <>{props.items.map(props.renderItem)}</>;
}
