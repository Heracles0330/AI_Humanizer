import React, { useState } from 'react';
import { Clock, Trash2, FileText, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { HumanizedText } from '../../lib/supabase';
import { formatDate, truncateText } from '../../lib/utils';

interface DocumentCardProps {
  document: HumanizedText;
  onDelete: (id: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(document.humanized_text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Error copying text:', error);
      });
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium">{document.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDate(document.created_at)}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-primary-600"
            onClick={handleCopyToClipboard}
          >
            {copied ? (
              <div className="text-success-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-error-600"
            onClick={() => onDelete(document.id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="text-gray-600 mb-4">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FileText className="h-4 w-4 mr-1" />
          <span>{document.character_count} characters</span>
        </div>
        {isExpanded ? (
          <p className="whitespace-pre-wrap">{document.humanized_text}</p>
        ) : (
          <p>{truncateText(document.humanized_text, 150)}</p>
        )}
      </div>
      
      {document.humanized_text.length > 150 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  );
};

export default DocumentCard;