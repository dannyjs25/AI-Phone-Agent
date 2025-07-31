import { useState, useEffect } from 'react';
import { VoiceSettings } from '@/types/customer';
import { elevenlabs } from '@/lib/elevenlabs';

interface VoiceOption {
  id: string;
  name: string;
  description: string;
  sampleUrl: string;
}

const voiceOptions: VoiceOption[] = [
  {
    id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Rachel',
    description: 'Natural and professional female voice',
    sampleUrl: '/samples/rachel-sample.mp3'
  },
  {
    id: '21m00Tcm4TlvDq8ikWAM',
    name: 'Adam',
    description: 'Natural and professional male voice',
    sampleUrl: '/samples/adam-sample.mp3'
  },
];

export default function VoiceSettingsPage() {
  const [settings, setSettings] = useState<VoiceSettings>({
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    voiceName: 'Rachel',
    stability: 0.5,
    similarityBoost: 0.75,
    useSpeakerBoost: true,
    style: 0.5,
    speed: 1.0,
    customGreeting: 'Thank you for calling. How may I assist you today?'
  });
  const [selectedVoice, setSelectedVoice] = useState(voiceOptions[0]);
  const [loading, setLoading] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);

  useEffect(() => {
    fetchVoiceSettings();
  }, []);

  const fetchVoiceSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customer/voice-settings');
      if (!response.ok) throw new Error('Failed to fetch voice settings');
      const data = await response.json();
      setSettings(data);
      setSelectedVoice(voiceOptions.find(v => v.id === data.voiceId) || voiceOptions[0]);
    } catch (error) {
      console.error('Error fetching voice settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customer/voice-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...settings,
          voiceId: selectedVoice.id,
          voiceName: selectedVoice.name
        }),
      });

      if (!response.ok) throw new Error('Failed to save settings');
      
      // Refresh settings
      fetchVoiceSettings();
    } catch (error) {
      console.error('Error saving voice settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setPreviewPlaying(true);
    const audio = new Audio(selectedVoice.sampleUrl);
    audio.play();
    audio.onended = () => setPreviewPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Voice Settings</h1>
            <p className="mt-1 text-sm text-gray-500">Customize your AI assistant's voice</p>
          </div>
          <Link
            href="/customer"
            className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            {/* Voice Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Voice Selection</h2>
              <div className="space-y-4">
                {voiceOptions.map((voice) => (
                  <div
                    key={voice.id}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedVoice.id === voice.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedVoice(voice)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{voice.name}</h3>
                        <p className="text-sm text-gray-500">{voice.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview();
                        }}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        {previewPlaying ? 'Playing...' : 'Preview'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stability
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.stability}
                    onChange={(e) => setSettings({ ...settings, stability: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">
                    {settings.stability.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Less Stable</span>
                  <span>More Stable</span>
                </div>
              </div>

              {/* Similarity Boost */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Similarity Boost
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.similarityBoost}
                    onChange={(e) => setSettings({ ...settings, similarityBoost: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">
                    {settings.similarityBoost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Less Similar</span>
                  <span>More Similar</span>
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
                    <p className="text-gray-500">
                      Enhance voice clarity and naturalness
                    </p>
                  </div>
                </div>
              </div>

              {/* Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={settings.style}
                    onChange={(e) => setSettings({ ...settings, style: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">
                    {settings.style.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Neutral</span>
                  <span>Expressive</span>
                </div>
              </div>

              {/* Speed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speed
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.01"
                    value={settings.speed}
                    onChange={(e) => setSettings({ ...settings, speed: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">
                    {settings.speed.toFixed(2)}x
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>

              {/* Custom Greeting */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Greeting
                </label>
                <textarea
                  value={settings.customGreeting}
                  onChange={(e) => setSettings({ ...settings, customGreeting: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your custom greeting..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  This greeting will be used when your AI assistant answers calls
                </p>
              </div>
            </div>

            {/* Save Button */}
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
