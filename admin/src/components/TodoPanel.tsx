import * as React from 'react';
import { unstable_useContentManagerContext as useContentManagerContext, type PanelComponent } from '@strapi/content-manager/strapi-admin';
import { TextButton } from '@strapi/design-system';
import { Plus } from '@strapi/icons';

const TodoPanel: PanelComponent = () => {
  const { isCreatingEntry } = useContentManagerContext();
  return {
    title: 'Todo List',
    content: (
      <div>
        <TextButton
          startIcon={<Plus />}
          disabled={isCreatingEntry}
        />
        {/* Todo list implementation goes here */}
      </div>
    )
  }
}
 
export default TodoPanel;