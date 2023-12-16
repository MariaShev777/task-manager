import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from 'common/components';
import { TASK_STATUSES } from 'common/enums';
import { TaskType } from 'features/todolistsList/api/tasks/tasksApi.types';
import { useAppDispatch } from 'common/hooks';
import { tasksThunks } from 'features/todolistsList/model/tasks/tasksReducer';
import s from 'features/todolistsList/ui/todolist/tasks/task/Task.module.css';

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo(({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTaskHandler = useCallback(() => {
    dispatch(tasksThunks.deleteTask({ todolistId, taskId: task.id }));
  }, [todolistId, task.id]);

  const changeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let status = e.currentTarget.checked ? TASK_STATUSES.Completed : TASK_STATUSES.New;
      dispatch(
        tasksThunks.updateTask({
          todolistId,
          taskId: task.id,
          domainModel: { status },
        }),
      );
    },
    [todolistId, task.id],
  );

  const changeTaskTitleHandler = (title: string) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId: task.id, domainModel: { title } }));
  };

  return (
    <div className={task.status === TASK_STATUSES.Completed ? s.isDone : 'task'}>
      <input
        type="checkbox"
        checked={task.status === TASK_STATUSES.Completed}
        onChange={changeTaskStatusHandler}
        style={{ marginRight: '15px', transform: 'translateY(2px)', display: 'inline-block' }}
      />
      <EditableSpan title={task.title} onChange={changeTaskTitleHandler} />
      <button onClick={deleteTaskHandler} style={{ padding: '3px 8px', color: '#1f1f20', fontWeight: 'bold' }}>
        X
      </button>
    </div>
  );
});
