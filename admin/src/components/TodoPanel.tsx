import * as React from 'react';
import { unstable_useContentManagerContext as useContentManagerContext, type PanelComponent } from '@strapi/content-manager/strapi-admin';
import { TextButton } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import TaskList from './TodoList';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import TodoModal from './TodoModal';

const queryClient = new QueryClient();

const TodoPanel: PanelComponent = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { id } = useContentManagerContext();
  return {
    title: 'Todo List',
    content: (
      <QueryClientProvider client={queryClient}>
        <div>
          <TextButton
            onClick={() => setModalOpen(true)}
            startIcon={<Plus />}
            disabled={!id}
          >
            Add todo
          </TextButton>
          {id && (
            <>
              <TodoModal isOpen={modalOpen} onOpenChange={setModalOpen} />
              <TaskList />
            </>
          )}
        </div>
      </QueryClientProvider>
    )
  }
}
 
export default TodoPanel;