import { useState } from 'react';
import { VoiceSettings } from '@/types/customer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface VoiceSettingsEditorProps {
  settings: VoiceSettings;
  onSave: (settings: VoiceSettings) => void;
}

export function VoiceSettingsEditor({ settings, onSave }: VoiceSettingsEditorProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [previewPlaying, setPreviewPlaying] = useState(false);

  const handlePreview = () => {
    setPreviewPlaying(true);
    // Simulate audio preview
    setTimeout(() => setPreviewPlaying(false), 3000);
  };

  const handleSave = () => {
    onSave(localSettings);
  };

  return (
    <div className="space-y-6">
      {/* Voice Selection */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Voice Selection</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                value={localSettings.voiceName}
                onChange={(e) => setLocalSettings({ ...localSettings, voiceName: e.target.value })}
                placeholder="Voice Name"
              />
            </div>
            <Button
              onClick={handlePreview}
              disabled={previewPlaying}
            >
              {previewPlaying ? 'Playing...' : 'Preview Voice'}
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Voice Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Stability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stability</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={localSettings.stability}
              onChange={(e) => setLocalSettings({ ...localSettings, stability: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Less Stable</span>
              <span>{localSettings.stability.toFixed(2)}</span>
              <span>More Stable</span>
            </div>
          </div>

          {/* Similarity Boost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Similarity Boost</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={localSettings.similarityBoost}
              onChange={(e) => setLocalSettings({ ...localSettings, similarityBoost: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Less Similar</span>
              <span>{localSettings.similarityBoost.toFixed(2)}</span>
              <span>More Similar</span>
            </div>
          </div>

          {/* Speaker Boost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Speaker Boost</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={localSettings.useSpeakerBoost}
                  onChange={(e) => setLocalSettings({ ...localSettings, useSpeakerBoost: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Speaker Boost</span>
              </label>
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={localSettings.style}
              onChange={(e) => setLocalSettings({ ...localSettings, style: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Neutral</span>
              <span>{localSettings.style.toFixed(2)}</span>
              <span>Expressive</span>
            </div>
          </div>

          {/* Speed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.01"
              value={localSettings.speed}
              onChange={(e) => setLocalSettings({ ...localSettings, speed: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>Slow</span>
              <span>{localSettings.speed.toFixed(2)}x</span>
              <span>Fast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Greeting */}
      <div className="bg-white p-6 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">Custom Greeting</label>
        <textarea
          value={localSettings.customGreeting}
          onChange={(e) => setLocalSettings({ ...localSettings, customGreeting: e.target.value })}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your custom greeting..."
        />
        <p className="mt-2 text-sm text-gray-500">
          This greeting will be used when your AI assistant answers calls
        </p>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
}
