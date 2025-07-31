import { useState, useEffect } from 'react';
import { VoiceSettings } from '@/types/elevenlabs';
import { elevenlabs } from '@/lib/elevenlabs';

interface VoiceOption {
  id: string;
  name: string;
  description: string;
}

const voiceOptions: VoiceOption[] = [
  {
    id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Rachel',
    description: 'Natural and professional female voice',
  },
  {
    id: '21m00Tcm4TlvDq8ikWAM',
    name: 'Adam',
    description: 'Natural and professional male voice',
  },
];

export default function VoiceSettingsPage() {
  const [settings, setSettings] = useState<VoiceSettings>({
    stability: 0.5,
    similarityBoost: 0.75,
    useSpeakerBoost: true,
    style: 0.5,
    speed: 1.0,
  });
  const [selectedVoice, setSelectedVoice] = useState(voiceOptions[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/voice-settings');
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/voice-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          voiceId: selectedVoice.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to save settings');
      
      // Refresh settings
      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Voice Settings</h1>
            <p className="mt-1 text-sm text-gray-500">Configure the AI voice settings</p>
          </div>
          <Link
            href="/admin"
            className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Admin
          </Link>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice
                </label>
                <select
                  value={selectedVoice.id}
                  onChange={(e) => {
                    const selected = voiceOptions.find(v => v.id === e.target.value);
                    if (selected) setSelectedVoice(selected);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {voiceOptions.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name} - {voice.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stability
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={settings.stability}
                  onChange={(e) => setSettings({ ...settings, stability: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0</span>
                  <span>1</span>
                </div>
              </div>

              {/* Similarity Boost */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Similarity Boost
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={settings.similarityBoost}
                  onChange={(e) => setSettings({ ...settings, similarityBoost: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0</span>
                  <span>1</span>
                </div>
              </div>

              {/* Speaker Boost */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speaker Boost
                </label>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="speakerBoost"
                      type="checkbox"
                      checked={settings.useSpeakerBoost}
                      onChange={(e) => setSettings({ ...settings, useSpeakerBoost: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="speakerBoost" className="font-medium text-gray-700">
                      Enable speaker boost
                    </label>
                  </div>
                </div>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={settings.style}
                  onChange={(e) => setSettings({ ...settings, style: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0</span>
                  <span>1</span>
                </div>
              </div>

              {/* Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speed
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.01"
                  value={settings.speed}
                  onChange={(e) => setSettings({ ...settings, speed: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0.5</span>
                  <span>2</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
