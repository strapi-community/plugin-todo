import { useState } from 'react';
import { Button } from '@strapi/design-system';
import { Field } from '@strapi/design-system';
import { Modal } from '@strapi/design-system';
import { unstable_useContentManagerContext, useFetchClient } from '@strapi/strapi/admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TodoModal = ({ isOpen, onOpenChange }: Props) => {
  const [taskName, setTaskName] = useState('');
  const { id, model } = unstable_useContentManagerContext();
  const { post } = useFetchClient();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (data: any) => {
      return post('/todo/tasks', { data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
      setTaskName('');
      onOpenChange(false);
    },
  });

  const submitForm = () => {
    createTaskMutation.mutate({ 
      name: taskName, 
      related: [{
        __type: model,
        id,
      }],
    });
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Create task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field.Root name="task" required>
            <Field.Label>Task</Field.Label>
            <Field.Input 
              value={taskName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
            />
          </Field.Root>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>
            <Button variant="tertiary">Cancel</Button>
          </Modal.Close>
          <Button 
            onClick={submitForm} 
            loading={createTaskMutation.isPending}
            disabled={!taskName.trim() || createTaskMutation.isPending}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
 
export default TodoModal;