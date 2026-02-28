'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';

interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'list';
  nested?: string; // for nested objects like bankDetails.bank
}

interface Props {
  title: string;
  fields: FieldConfig[];
  data: Record<string, unknown>;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  password: string;
}

export default function SectionEditor({ title, fields, data, onSave, password }: Props) {
  const [formData, setFormData] = useState<Record<string, unknown>>(JSON.parse(JSON.stringify(data)));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const getValue = (key: string, nested?: string): string => {
    if (nested) {
      const parent = formData[nested] as Record<string, unknown> | undefined;
      return (parent?.[key] as string) || '';
    }
    return (formData[key] as string) || '';
  };

  const getListValue = (key: string): string[] => {
    return (formData[key] as string[]) || [];
  };

  const setValue = (key: string, value: unknown, nested?: string) => {
    setFormData((prev) => {
      const next = { ...prev };
      if (nested) {
        next[nested] = { ...(next[nested] as Record<string, unknown>), [key]: value };
      } else {
        next[key] = value;
      }
      return next;
    });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(formData);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-brand-dark">{title}</h3>

      {fields.map((field) => {
        if (field.type === 'image') {
          return (
            <ImageUpload
              key={field.key}
              label={field.label}
              currentImage={getValue(field.key) || undefined}
              password={password}
              onUpload={(url) => setValue(field.key, url)}
            />
          );
        }

        if (field.type === 'list') {
          const items = getListValue(field.key);
          return (
            <div key={field.key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              {items.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[i] = e.target.value;
                      setValue(field.key, newItems);
                    }}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
                  />
                  <button
                    onClick={() => {
                      const newItems = items.filter((_, j) => j !== i);
                      setValue(field.key, newItems);
                    }}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setValue(field.key, [...items, ''])}
                className="text-sm text-brand-teal hover:underline"
              >
                + Add item
              </button>
            </div>
          );
        }

        if (field.type === 'textarea') {
          return (
            <div key={field.key + (field.nested || '')}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <textarea
                value={getValue(field.key, field.nested)}
                onChange={(e) => setValue(field.key, e.target.value, field.nested)}
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none resize-y"
              />
            </div>
          );
        }

        return (
          <div key={field.key + (field.nested || '')}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type="text"
              value={getValue(field.key, field.nested)}
              onChange={(e) => setValue(field.key, e.target.value, field.nested)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
            />
          </div>
        );
      })}

      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
          saved
            ? 'bg-green-500'
            : saving
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-brand-teal hover:bg-teal-700'
        }`}
      >
        {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
