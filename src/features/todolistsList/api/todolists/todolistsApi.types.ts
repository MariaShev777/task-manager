export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ChangeTodolistTitleArgsType = { todolistId: string; title: string };
