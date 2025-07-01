
import React from 'react';

const LoginHeader: React.FC = () => {
  return (
    <div className="text-center text-white">
      <h1 className="text-4xl font-bold mb-2">Welcome to</h1>
      <h2 className="text-4xl font-bold mb-4">CMS Admin</h2>
      <div className="flex justify-center">
        <img 
          src="/lovable-uploads/f08aa06e-bc23-4432-8793-168fae4076af.png" 
          alt="Logo" 
          className="h-12 object-contain"
        />
      </div>
    </div>
  );
};

export default LoginHeader;
