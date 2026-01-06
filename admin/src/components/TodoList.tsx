import * as React from 'react';
import { unstable_useContentManagerContext, useFetchClient } from '@strapi/strapi/admin';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Checkbox } from '@strapi/design-system';

const TaskList = () => {
  const { get, put } = useFetchClient();
  const { id, slug } = unstable_useContentManagerContext();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['tasks', id],
    queryFn: async () => {
      return get(`/todo/tasks/related/${slug}/${id}`);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ documentId, done }: { documentId: string; done: boolean }) => {
      return put(`/todo/tasks/${documentId}`, { data: { done } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
    },
  });

  const handleCheckboxChange = (taskId: string, currentDone: boolean) => {
    updateTaskMutation.mutate({ documentId: taskId, done: !currentDone });
  };

  if (isLoading) {
    return null;
  }

  return (
    <ul>
      {data?.data.map((task: { documentId: string; name: string; done: boolean }) => (
        <li style={{ marginTop: '12px' }} key={task.documentId}>
          <Checkbox 
            checked={task.done || false}
            onCheckedChange={() => handleCheckboxChange(task.documentId, task.done)}
          >
            {task.name}
          </Checkbox>
        </li>
      ))}
    </ul>
  );
}
 
export default TaskList;