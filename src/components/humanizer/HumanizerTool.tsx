import React, { useState } from 'react';
import { RefreshCw, Copy, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { useHumanizerStore } from '../../lib/store';
import { useProfile } from '../../lib/hooks';
import { humanize, calculateCreditsNeeded } from '../../lib/utils';

interface HumanizerToolProps {
  saveEnabled?: boolean;
  onSave?: (title: string) => void;
}

const HumanizerTool: React.FC<HumanizerToolProps> = ({ 
  saveEnabled = false,
  onSave
}) => {
  const { inputText, outputText, isProcessing, setInputText, setOutputText, setIsProcessing } = useHumanizerStore();
  const { profile, updateProfile } = useProfile();
  const [copied, setCopied] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleHumanize = async () => {
    if (!inputText.trim()) return;
    
    const creditsNeeded = calculateCreditsNeeded(inputText);
    
    // Check if user has enough credits
    if (profile && profile.credits_remaining < creditsNeeded) {
      alert('You do not have enough credits. Please upgrade your plan or purchase more credits.');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await humanize(inputText);
      setOutputText(result);
      
      // Deduct credits if user is authenticated
      if (profile) {
        await updateProfile({
          credits_remaining: profile.credits_remaining - creditsNeeded
        });
      }
    } catch (error) {
      console.error('Error humanizing text:', error);
      alert('An error occurred while humanizing your text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Error copying text:', error);
      });
  };

  const handleSave = () => {
    if (!outputText || !onSave) return;
    
    setIsSaving(true);
    
    try {
      onSave(saveTitle || 'Untitled Document');
      setShowSaveDialog(false);
      setSaveTitle('');
    } catch (error) {
      console.error('Error saving document:', error);
      alert('An error occurred while saving your document. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <div className="mb-2 flex justify-between items-center">
            <h3 className="font-medium text-gray-700">AI-Generated Text</h3>
            {profile && (
              <span className="text-sm text-gray-500">
                Credits: {profile.credits_remaining}
              </span>
            )}
          </div>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your AI-generated text here..."
            className="h-64 md:h-80"
          />
        </div>
        
        <div className="w-full">
          <div className="mb-2 flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Humanized Text</h3>
            <div className="flex space-x-2">
              {saveEnabled && outputText && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSaveDialog(true)}
                >
                  Save
                </Button>
              )}
              {outputText && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyToClipboard}
                  leftIcon={copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              )}
            </div>
          </div>
          <Textarea
            value={outputText}
            readOnly
            placeholder="Your humanized text will appear here..."
            className="h-64 md:h-80 bg-gray-50"
          />
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button
          variant="primary"
          onClick={handleHumanize}
          isLoading={isProcessing}
          leftIcon={isProcessing ? undefined : <Sparkles className="h-5 w-5" />}
          disabled={!inputText.trim() || isProcessing}
          className="px-8"
        >
          {isProcessing ? 'Humanizing...' : 'Humanize Text'}
        </Button>
      </div>
      
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Save Document</h3>
            <input
              type="text"
              value={saveTitle}
              onChange={(e) => setSaveTitle(e.target.value)}
              placeholder="Document title"
              className="input-field mb-4"
            />
            <div className="flex space-x-4 justify-end">
              <Button
                variant="ghost"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                isLoading={isSaving}
                disabled={isSaving}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanizerTool;