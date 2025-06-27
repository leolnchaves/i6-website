
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentEditor from '@/components/admin/ContentEditor';

const AdminContent: React.FC = () => {
  return (
    <AdminLayout>
      <ContentEditor />
    </AdminLayout>
  );
};

export default AdminContent;
